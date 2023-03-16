// const database = require('../src/models/database');
const pgpool = require('../src/helpers/pgpool');
const childprocess = require('child_process');
const pool = pgpool.getPool();
/* eslint-disable no-undef */
beforeAll(() => {
    childprocess.execSync(
        'npx knex migrate:latest --env test --knexfile ./knexfile.js'
    )
})
afterAll(async () => {
    childprocess.execSync(
        'npx knex migrate:rollback --env test --knexfile ./knexfile.js'
    )
    await pool.end();
})

describe('test db queries', () => {
    // connect to a test database with pgpool
    // now with node_env test
    // run migration
    // insert production data? or test data
    // write a test
    test('check if component name exists', async () => {
        const existingComponentName = 'search-engine';
        const queryCountdoubleName = 'SELECT id FROM component AS com WHERE com.name=$1'
        const checkName = await pool.query(queryCountdoubleName, [existingComponentName]);
        expect(checkName.rows.length).toBe(0);
    });
    /* test('test add component to DB', () => {
        const inputdata = { componentName: 'component-test', inputVersion: '1.0.0', information: '<p>some instructions - do this, ...<br></p>', website: 'https://www.startpage.com', publisher: 'the publisher' };
        const existingComponentName = undefined;
        return database.addToDB(inputdata, existingComponentName).then(result => {
            expect(result).toBe(undefined);
        });
    }); */
})