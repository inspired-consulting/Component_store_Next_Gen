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
    test('check if component name exists', async () => {
        const existingComponentName = 'search-engine';
        const queryCountdoubleName = 'SELECT id FROM component AS com WHERE com.name=$1'
        const checkName = await pool.query(queryCountdoubleName, [existingComponentName]);
        expect(checkName.rows.length).toBe(0);
    });
    test('insert example component', async () => {
        const queryComponent = `INSERT INTO component
                                (id, uuid, name, website) 
                            VALUES
                                ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3) 
                            RETURNING id`
        const checkName = await pool.query(queryComponent, ['eea139d4-5127-445c-8c0b-c6fdba34d679', 'component', 'website']);
        expect(checkName.rows.length).toBe(1);
    });
    /* test('test add component to DB', () => {
        const inputdata = { componentName: 'component-test', inputVersion: '1.0.0', information: '<p>some instructions - do this, ...<br></p>', website: 'https://www.startpage.com', publisher: 'the publisher' };
        const existingComponentName = undefined;
        return database.addToDB(inputdata, existingComponentName).then(result => {
            expect(result).toBe(undefined);
        });
    }); */
})