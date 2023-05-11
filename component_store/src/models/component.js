const pgpool = require('../helpers/pgpool');
const uuid = require('uuid');
const logger = require('../../winston_logger');

/**
 * function, which checks if the row of component table has already an entry with the given value.
 * @param {string} key - row of table component
 * @param {string} value - filter by value
 */
const findComponents = (key, value) => {
    const pool = pgpool.getPool();
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component WHERE ' + key + ' = $1', [value], (err, result) => {
            if (err) {
                logger.error('query for findComponents failed' + err);
                reject(err);
            } else {
                resolve(result.rows);
            }
        })
    })
}

/**
 * function, which creates a component and adds it to the database.
 */
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
            if (err) {
                logger.error('query for createComponent failed' + err);
                return reject(err);
            }
            const row = result.rows.length > 0 ? result.rows[0] : false;
            logger.error('componentdata could not be created' + err);
            // eslint-disable-next-line no-undef
            if (!row) { return reject(new InvalidResetError('componentdata could not be created')); }
            resolve(result.rows[0].id)
        })
    })
}

/**
 * function, which collects information for update page from component and component_version
 * filtered by a specific name.
 */
const getComponentDetailsByName = (name) => {
    const pool = pgpool.getPool();
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT
            c.name,
            c.website,
            cv.version,
            cv.information,
            cv.publisher
        FROM
            component c
            LEFT JOIN component_version cv ON cv.component_id = c.id
        WHERE
            c.name = $1
        ORDER BY cv.version DESC;`, [name], (err, result) => {
            if (err) {
                logger.error('query for getComponentDetailsByName failed' + err);
                reject(err)
            } else {
                resolve(result.rows);
            }
        })
    })
}

/**
 * function, which collects information for componentDetails page from component and component_version
 * filtered by a specific name.
 */
const readFromDB = (name) => {
    const pool = pgpool.getPool()
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM component,component_version WHERE component.name=$1 AND component.id=component_version.component_id ', [name], (err, result) => {
            if (!err) {
                resolve(result.rows);
            } else {
                logger.error('query for readFromDB failed' + err);
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

/**
 * function, which collects information for componentlist page
 * from database.
 * @param {number} limit - number of rows, which are returned by the query
 * @param {string} offset - skips number of rows, before beginning to return the rows
 * @param {string} queryParameter - sorted alphabetically, new
 * @param {string} sortBy - name, id
 * @param {string} order - asc, desc
 */
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
                logger.error('query for listComponents failed' + err);
                reject(err);
            } else {
                pool.query(`
                SELECT COUNT(c.id) 
                FROM component c
                WHERE ` + buildSearchCondition(queryParameter, ['c.name']),
                ['%' + componentQuery + '%'], (err, count) => {
                    if (err) {
                        logger.error('searchquery for listComponents failed' + err);
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
    listComponents,
    getComponentDetailsByName
}