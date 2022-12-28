const pgpool = require('../helpers/pgpool')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function readFromDB () {
    const pool = pgpool.getPool()
    pool.query('SELECT * FROM component ', (err, result) => {
        if (!err) {
            console.log('result', result.rows)
            console.log('data is shown');
        } else {
            console.log(err.message);
        }
    })
}

// is there a same version?
function checkValues (pool, componentName, id, inputVersion) {
    const queryCountdoubleRow = `SELECT * 
    FROM public.component as com, public.component_version as com_v 
    WHERE com.id=com_v.component_id AND com.name=$1 AND com_v.version=$2`
    pool.query(queryCountdoubleRow, [componentName, inputVersion], (err, result) => {
        if (!err) {
            console.log('version:' + result.rows.length);
            if (result.rows.length === 0) {
                insertIntoComponentVersion(pool, id, inputVersion);
            } else {
                console.log('the version already exist!');
            }
        } else {
            console.log(err.message);
        }
    });
}

// inserts the data into component-version table
function insertIntoComponentVersion (pool, id, inputVersion) {
    const queryComponentVersion = `INSERT INTO component_version
    (id, uuid, component_id, version, readme, entry_file) 
    VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, 'exampletext' , 'main.js')`
    pool.query(queryComponentVersion, [uuidv4(), id, inputVersion], (err, result) => {
        if (!err) {
            console.log('inserted value into component-version!');
        } else {
            console.log(err.message);
        }
    });
}

// inserts data into component and component version
function insertIntoComponentAndComponentVersion (pool, componentName, inputVersion) {
    const queryComponent = `INSERT INTO component
        (id, uuid, name, homepage) 
        VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, 'www.startpage.com') RETURNING id`
    pool.query(queryComponent, [uuidv4(), componentName], (err, result) => {
        if (!err) {
            console.log('inserted value', result.rows[0].id);
            checkValues(pool, componentName, result.rows[0].id, inputVersion);
        } else {
            console.log(err.message);
        }
    });
}

// does the name already exists?
function insertIntoDB (componentName, inputVersion) {
    const queryCountdoubleName = `SELECT id 
    FROM public.component AS com
    WHERE com.name=$1`
    const pool = pgpool.getPool();
    pool.query(queryCountdoubleName, [componentName], (err, result) => {
        // if :
        if (!err && result.rows.length === 0) {
            // the name doesn't exists -> insert into component and component_version
            insertIntoComponentAndComponentVersion(pool, componentName, inputVersion);
        } else if (!err && result.rows.length > 0) {
            // the name already exisits -> insert only in component_version
            checkValues(pool, componentName, result.rows[0].id, inputVersion);
        } else {
            console.log(err.message);
        }
    });
}

function addToDB () {
    fs.readFile('componentData.json', (err, data) => {
        if (err) throw err;
        const loadedcomponentData = JSON.parse(data);
        const componentName = loadedcomponentData.componentName;
        const inputVersion = loadedcomponentData.inputVersion;

        insertIntoDB(componentName, inputVersion);
    });
}

module.exports = { addToDB, readFromDB };

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
