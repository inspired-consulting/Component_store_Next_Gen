const pgpool = require('../helpers/pgpool');
const { v4: uuidv4 } = require('uuid')
const logger = require('../../winston_logger');

/**
 * Save the component or it's version inside of database
 * @param {Object} inputdata
 * @param {"component"} inputdata.componentName - name of component
 * @param {"1.0.0"} inputdata.inputVersion - version of component
 * @param {"<p>some info<br></p>"} inputdata.information - additional information for component
 * @param {"https://www.google.com"} inputdata.website - website of publisher/organisation
 * @param {"the publisher"} inputdata.publisher - publisher of component
 * @param {string} existingComponentName - Name of component if it already exists
 * @param {string} file - file name, which should be uploaded
 */

async function addToDB (inputdata, existingComponentName, file) {
    logger.info('inputdata ' + JSON.stringify(inputdata));
    logger.info('existingComponentName ' + existingComponentName);
    const pool = pgpool.getPool();
    inputdata = JSON.parse(JSON.stringify(inputdata));
    // queries
    const createComponent = `INSERT INTO component
                                (id, uuid, name, website) 
                            VALUES
                                ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3) 
                            RETURNING id`

    const createComponentVersion = `INSERT INTO component_version
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

        // insert data under certain preconditions
        if (checkName.rows.length > 0 && checkUpdatedVersion.rows.length === 0) {
            logger.info('Name existiert schon, Version noch nicht, componentId: ' + checkName.rows[0].id);
            const updatedComponent = await pool.query(updateComponent, [uuidv4(), checkName.rows[0].id, inputdata.updateInputVersion, inputdata.updateInformation, file, inputdata.publisher]);
            logger.info('updatedComponent' + updatedComponent.rows.length)
        } else {
            logger.warn('Weder der Name noch die Version existieren');
            const insertComponent = await pool.query(createComponent, [uuidv4(), inputdata.componentName, inputdata.website]);
            logger.info('id of newly added component is: ' + insertComponent.rows[0].id);
            insertComponent.rows.length > 0 ? await pool.query(createComponentVersion, [uuidv4(), insertComponent.rows[0].id, inputdata.inputVersion, inputdata.information, file, inputdata.publisher]) : logger.error('Error: failed to insert into component');
        }
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    addToDB
}