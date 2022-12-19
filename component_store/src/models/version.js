const pgpool = require('../helpers/pgpool');
const uuid = require('uuid');

const findVersionData = (key, value) => {
    var pool = pgpool.getPool();
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component_version WHERE ' + key + ' = $1', [value], (err, result) => {
            if (err) { 
                reject(err);
            }
            else {
                resolve(result.rows);
            }
        })
    })
}

const createVersion = (data, componentId) => {
    const versionData = {
                componentName: data.componentName,
                version: data.inputVersion,
                information: data.information,
                entryfile: data.entryFile,
                website: data.website
             }
    return new Promise((resolve, reject) => {
        var pool = pgpool.getPool();
        var versionId = uuid.v4();
        pool.query(`INSERT INTO component_version
            (id, uuid, component_id, version, information, entry_file)
        VALUES
            ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2, $3, $4, $5)
        RETURNING id`,
        [versionId, componentId, versionData.version, versionData.information, versionData.entryfile], 
        (err, result) => {
            if(err) { return reject(err);}
            const row = result.rows.length > 0 ? result.rows[0] : false;
            if(!row) {return reject(new InvalidResetError("versiondata could not be created"));}
            var version = {
                id: result.rows[0]
            }
            resolve(version)
        })
    })
}

module.exports = {
    findVersionData: findVersionData,
    createVersion: createVersion
}

