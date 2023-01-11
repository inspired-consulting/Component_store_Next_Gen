const pgpool = require('../helpers/pgpool')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

async function readFromDB (name) {
    const pool = pgpool.getPool()
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component,component_version WHERE component.name=$1 AND component.id=component_version.component_id ', [name], (err, result) => {
            if (!err) {
                console.log('result', result.rows);
                console.log('data is shown');
                resolve(result.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

async function readCompNameFromDB (name) {
    const pool = pgpool.getPool()
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component WHERE UPPER(component.name)=UPPER($1) ORDER BY component.name ASC LIMIT 20', [name], (err, result) => {
            if (!err) {
                // console.log('result', result.rows)
                console.log('data is shown');
                resolve(result.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

async function readCompFromDB () {
    const pool = pgpool.getPool()
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component ORDER BY component.name ASC LIMIT 20', (err, result) => {
            if (!err) {
                // console.log('result', result.rows)
                console.log('data is shown');
                resolve(result.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

// is there a same version?
function checkValues (pool, componentName, id, inputVersion, inputReadme, file) {
    const queryCountdoubleRow = `SELECT * 
    FROM public.component as com, public.component_version as com_v 
    WHERE com.id=com_v.component_id AND com.name=$1 AND com_v.version=$2`
    pool.query(queryCountdoubleRow, [componentName, inputVersion], (err, result) => {
        if (!err) {
            console.log('version: ' + result.rows.length);
            if (result.rows.length === 0) {
                insertIntoComponentVersion(pool, id, inputVersion, inputReadme, file);
            } else {
                console.log('the version already exist!');
            }
        } else {
            console.log(err.message);
        }
    });
}

// inserts the data into component-version table
function insertIntoComponentVersion (pool, id, inputVersion, inputReadme, file) {
    const queryComponentVersion = `INSERT INTO component_version
    (id, uuid, component_id, version, readme, entry_file) 
    VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5)`
    pool.query(queryComponentVersion, [uuidv4(), id, inputVersion, inputReadme, file], (err, result) => {
        if (!err) {
            console.log('inserted value into component-version!');
        } else {
            console.log(err.message);
        }
    });
}

// inserts data into component and component version
function insertIntoComponentAndComponentVersion (pool, data, file) {
    const queryComponent = `INSERT INTO component
        (id, uuid, name, website) 
        VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3)`
    pool.query(queryComponent, [uuidv4(), data.componentName, data.website], (err, result) => {
        if (!err) {
            console.log('inserted value', result.rows.length > 0 ? result.rows[0].id : 'no result rows');
            if (result.rows.length > 0) {
                checkValues(pool, data.componentName, result.rows[0].id, data.inputVersion, data.information, file);
            }
        } else {
            console.log(err.message);
        }
    });
}

// does the name already exists?
function insertIntoDB (data, file) {
    const queryCountdoubleName = `SELECT id 
    FROM public.component AS com
    WHERE com.name=$1`
    const pool = pgpool.getPool();
    pool.query(queryCountdoubleName, [data.componentName], (err, result) => {
        // if :
        if (!err && result.rows.length === 0) {
            // the name doesn't exists -> insert into component and component_version
            insertIntoComponentAndComponentVersion(pool, data, file);
        } else if (!err && result.rows.length > 0) {
            // the name already exisits -> insert only in component_version
            checkValues(pool, data.componentName, result.rows[0].id, data.inputVersion, data.information, file);
        } else {
            console.log(err.message);
        }
    });
}

async function addToDB2 (inputdata) {
    try {
        const awaitfile = await fs.promises.readFile('componentData.json');
        const loadedcomponentData = JSON.parse(awaitfile);
        const file = loadedcomponentData.component;
        insertIntoDB(inputdata, file);
    } catch (error) {
        console.error('Error occurred while reading file!', error);
    }
}

async function addToDB (inputdata) {
    const pool = pgpool.getPool();

    // queries
    const queryComponent = `INSERT INTO component
        (id, uuid, name, website) 
        VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3) RETURNING id`

    const queryComponentVersion = `INSERT INTO component_version
    (id, uuid, component_id, version, readme, entry_file) 
    VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5)`

    const queryCountdoubleName = `SELECT id 
    FROM public.component AS com
    WHERE com.name=$1`

    const queryCountdoubleVersion = `SELECT * 
    FROM public.component as com, public.component_version as com_v 
    WHERE com.id=com_v.component_id AND com.name=$1 AND com_v.version=$2`

    const updateFile = `UPDATE public.component_version 
    SET entry_file=$1 WHERE component_id=$2;`

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
            // console.log('Name with Version exists already. (id,version)' + checkName.rows[0].id + ' ' + checkVersion.rows[0].version);
            await pool.query(updateFile, [file, checkName.rows[0].id]);
        } else if (checkName.rows.length > 0 && checkVersion.rows.length === 0) {
            console.log('Name existiert schon, Version noch nicht (id)' + checkName.rows[0].id);
            const insertComponentVersion = await pool.query(queryComponentVersion, [uuidv4(), checkName.rows[0].id, inputdata.inputVersion, inputdata.information, file]);
            console.log('insert into componentVersion' + insertComponentVersion.rows.length)
        } else {
            console.log('Weder der Name noch die Version existieren');
            const insertComponent = await pool.query(queryComponent, [uuidv4(), inputdata.componentName, inputdata.website]);
            console.log('returns ' + insertComponent.rows[0].id);
            insertComponent.rows.length > 0 ? await pool.query(queryComponentVersion, [uuidv4(), insertComponent.rows[0].id, inputdata.inputVersion, inputdata.information, file]) : console.log('Error: failed to insert into component');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addToDB, readFromDB, readCompFromDB, readCompNameFromDB };

// const query = `INSERT INTO component
//     (id, uuid, name, website)
//     VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component),'0e37df36-f698-11e6-8dd4-cb9ced3df976', 'example text', 'www.name.comnisha') RETURNING id`
//     var pool = pgpool.getPool();
//     pool.query(query, (err, result) => {
//     if (!err) {
//         console.log("inserted value", result.rows[0].id);
//     }
//     else {
//         console.log(err.message);
//     }
// })
