const pgpool = require('../helpers/pgpool')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

async function addToDB (inputdata) {
    const pool = pgpool.getPool();
    inputdata = JSON.parse(JSON.stringify(inputdata));
    // queries
    const queryComponent = `INSERT INTO component
        (id, uuid, name, website) 
        VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3) RETURNING id`

    const queryComponentVersion = `INSERT INTO component_version
    (id, uuid, component_id, version, information, entry_file, publisher) 
    VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5, $6)`

    const queryCountdoubleName = `SELECT id 
    FROM component AS com
    WHERE com.name=$1`

    const queryCountdoubleVersion = `SELECT * 
    FROM component as com, component_version as com_v 
    WHERE com.id=com_v.component_id AND com.name=$1 AND com_v.version=$2`

    const updateFile = `UPDATE component_version 
    SET entry_file=$1, information=$3 WHERE component_id=$2;`

    const updateWebsite = `UPDATE component 
    SET website=$1 WHERE id=$2;`

    try {
        // requests to check name and version
        const checkName = await pool.query(queryCountdoubleName, [inputdata.componentName]);
        const checkVersion = await pool.query(queryCountdoubleVersion, [inputdata.componentName, inputdata.inputVersion]);

        // retrieve file data
        const awaitfile = await fs.promises.readFile('componentData.json');
        const loadedcomponentData = JSON.parse(awaitfile);
        const file = loadedcomponentData.component;

        // insert data under ceratin preconditions
        if (checkName.rows.length > 0 && checkVersion.rows.length > 0) {
            await pool.query(updateFile, [file, checkName.rows[0].id, inputdata.information]);
            await pool.query(updateWebsite, [inputdata.website, checkName.rows[0].id]);
        } else if (checkName.rows.length > 0 && checkVersion.rows.length === 0) {
            console.log('Name existiert schon, Version noch nicht (id)' + checkName.rows[0].id);
            const insertComponentVersion = await pool.query(queryComponentVersion, [uuidv4(), checkName.rows[0].id, inputdata.inputVersion, inputdata.information, file, inputdata.publisher]);
            console.log('insert into componentVersion' + insertComponentVersion.rows.length)
        } else {
            console.log('Weder der Name noch die Version existieren');
            const insertComponent = await pool.query(queryComponent, [uuidv4(), inputdata.componentName, inputdata.website]);
            console.log('id of newly added component is: ' + insertComponent.rows[0].id);
            insertComponent.rows.length > 0 ? await pool.query(queryComponentVersion, [uuidv4(), insertComponent.rows[0].id, inputdata.inputVersion, inputdata.information, file, inputdata.publisher]) : console.log('Error: failed to insert into component');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addToDB };