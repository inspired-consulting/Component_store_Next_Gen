const pgpool = require('../helpers/pgpool');
const uuid = require('uuid');

const findComponents = (key, value) => {
    var pool = pgpool.getPool();
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component WHERE ' + key + ' = $1', [value], (err, result) => {
            if (err) { 
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        })
    })
}
const createComponent = (data) => {
    const componentData = {
        name: data.componentName,
        website: data.website
    }
    return new Promise((resolve, reject) => {
        var pool = pgpool.getPool();
        var componentId = uuid.v4();
        pool.query(`INSERT INTO component 
                    (id, uuid, name, website) 
                VALUES
                    ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3)
                RETURNING id`,
        [componentId, componentData.name, componentData.website],
        (err, result) => {
            if(err) { return reject(err);}
            const row = result.rows.length > 0 ? result.rows[0] : false;
            if(!row) {return reject(new InvalidResetError("componentdata could not be created"));}
            resolve(result.rows[0].id)
        })
    })
}

module.exports = {
    findComponents: findComponents,
    createComponent: createComponent
}