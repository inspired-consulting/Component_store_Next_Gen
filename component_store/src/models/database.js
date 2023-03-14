const pgpool = require('../helpers/pgpool');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const logger = require('../../winston_logger');

async function addToDB (inputdata, existingComponentName) {
    logger.info('inputdata', inputdata);
    logger.info('existingComponentName', existingComponentName);
    const pool = pgpool.getPool();
    inputdata = JSON.parse(JSON.stringify(inputdata));
    // queries
    const queryComponent = `INSERT INTO component
                                (id, uuid, name, website) 
                            VALUES
                                ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3) 
                            RETURNING id`

    const queryComponentVersion = `INSERT INTO component_version
                                    (id, uuid, component_id, version, information, entry_file, publisher) 
                                    VALUES
                                        ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5, $6)`

    const queryCountdoubleName = 'SELECT id FROM component AS com WHERE com.name=$1'

    const queryCountdoubleVersion = `SELECT * 
                                    FROM
                                        component as com,
                                        component_version as com_v 
                                    WHERE
                                        com.id=com_v.component_id 
                                    AND
                                        com.name=$1 
                                    AND
                                        com_v.version=$2`

    const updateComponent = `INSERT INTO component_version
                                (id, uuid, component_id, version, information, entry_file, publisher) 
                            VALUES 
                                ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5, $6)`

    try {
        // requests to check name and version
        const checkName = await pool.query(queryCountdoubleName, [existingComponentName]);
        const checkUpdatedVersion = await pool.query(queryCountdoubleVersion, [existingComponentName, inputdata.updateInputVersion]);
        // retrieve file data
        const awaitfile = await fs.promises.readFile('componentData.json');
        const loadedcomponentData = JSON.parse(awaitfile);
        const file = loadedcomponentData.component;

        // insert data under certain preconditions
        if (checkName.rows.length > 0 && checkUpdatedVersion.rows.length === 0) {
            logger.info('Name existiert schon, Version noch nicht, componentId: ' + checkName.rows[0].id);
            const updatedComponent = await pool.query(updateComponent, [uuidv4(), checkName.rows[0].id, inputdata.updateInputVersion, inputdata.updateInformation, file, inputdata.publisher]);
            logger.info('updatedComponent' + updatedComponent.rows.length)
        } else {
            logger.warn('Weder der Name noch die Version existieren');
            const insertComponent = await pool.query(queryComponent, [uuidv4(), inputdata.componentName, inputdata.website]);
            logger.info('id of newly added component is: ' + insertComponent.rows[0].id);
            insertComponent.rows.length > 0 ? await pool.query(queryComponentVersion, [uuidv4(), insertComponent.rows[0].id, inputdata.inputVersion, inputdata.information, file, inputdata.publisher]) : console.log('Error: failed to insert into component');
        }
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    addToDB
}