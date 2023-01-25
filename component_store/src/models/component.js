const pgpool = require('../helpers/pgpool');
const uuid = require('uuid');

const findComponents = (key, value) => {
    const pool = pgpool.getPool();
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component WHERE ' + key + ' = $1', [value], (err, result) => {
            if (err) {
                reject(err);
            } else {
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
        const pool = pgpool.getPool();
        const componentId = uuid.v4();
        pool.query(`INSERT INTO component 
                    (id, uuid, name, website) 
                VALUES
                    ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3)
                RETURNING id`,
        [componentId, componentData.name, componentData.website],
        (err, result) => {
            if (err) { return reject(err); }
            const row = result.rows.length > 0 ? result.rows[0] : false;
            // eslint-disable-next-line no-undef
            if (!row) { return reject(new InvalidResetError('componentdata could not be created')); }
            resolve(result.rows[0].id)
        })
    })
}

const readFromDB = (name) => {
    const pool = pgpool.getPool()
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component,component_version WHERE component.name=$1 AND component.id=component_version.component_id ', [name], (err, result) => {
            if (!err) {
                resolve(result.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

const buildSearchCondition = (queryParameter, searchFields) => {
    const searchConditions = [];
    searchFields.forEach(searchField => {
        searchConditions.push(`lower(${searchField}) LIKE lower($1) `)
    })
    return `(${searchConditions.join('OR ')})`
}

const listComponents = (limit, offset, queryParameter, sortBy, order) => {
    const pool = pgpool.getPool();
    return new Promise((resolve, reject) => {
        let query = `
        SELECT * FROM component c 
        WHERE ` + buildSearchCondition(queryParameter, ['c.name'])
        if (queryParameter === 'abc') {
            query += ` ORDER BY LOWER(c.${sortBy}) ${order}`
        } else {
            query += ` ORDER BY c.${sortBy} ${order}`
        }
        const componentQuery = queryParameter.q ? queryParameter.q : '';
        pool.query(query + ' LIMIT $2 OFFSET $3', ['%' + componentQuery + '%', limit, offset], (err, result) => {
            if (err) {
                reject(err);
            } else {
                pool.query(`
                SELECT COUNT(c.id) 
                FROM component c
                WHERE ` + buildSearchCondition(queryParameter, ['c.name']),
                ['%' + componentQuery + '%'], (err, count) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ result: result.rows.map(row => { return row }), count: count.rows[0].count });
                    }
                })
            }
        })
    })
}
module.exports = {
    readFromDB,
    findComponents,
    createComponent,
    listComponents
}