const pgpool = require('../src/helpers/pgpool');
const childprocess = require('child_process');
const pool = pgpool.getPool();

beforeAll(() => {
    childprocess.execSync(
        'knex migrate:rollback'
    )
    childprocess.execSync(
        'knex migrate:latest'
    )
})

afterAll(async () => {
    await pool.end();
})

describe('test db queries', () => {
    test('insert data in component table', async () => {
        const createComponent = `INSERT INTO component
                                (id, uuid, name, website) 
                            VALUES
                                ((SELECT COALESCE(MAX(id), 0) + 1 FROM component), $1, $2, $3) 
                            RETURNING id`
        const checkComponentName = await pool.query(createComponent, ['eea139d4-5127-445c-8c0b-c6fdba34d679', 'Nisha', 'websiteNisha']);
        expect(checkComponentName.rows.length).toBe(1);
    });

    test('insert data in component_version table', async () => {
        const createComponentVersion = `INSERT INTO component_version
                                            (id, uuid, component_id, version, information, entry_file, publisher) 
                                        VALUES
                                            ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5, $6)
                                        RETURNING id`
        const checkComponentVersion = await pool.query(createComponentVersion, ['eea139d4-5127-445c-8c0b-c6fdba34d879', '1', 'componentNisha_version', 'information_Nisha', 'entry_file_nisha', 'nisha shukla']);
        expect(checkComponentVersion.rows.length).toBe(1);
    });

    test('check if component name exists', async () => {
        const existingComponentName = 'Nisha';
        const queryCountdoubleName = 'SELECT id FROM component AS com WHERE com.name=$1'
        const checkName = await pool.query(queryCountdoubleName, [existingComponentName]);
        expect(checkName.rows.length).toBe(1);
    })

    test('check if component version exists', async () => {
        const existingComponentName = 'Nisha';
        const existingComponentVersion = 'componentNisha_version';
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
        const checkDoubleVersionCount = await pool.query(queryCountdoubleVersion, [existingComponentName, existingComponentVersion]);
        expect(checkDoubleVersionCount.rows.length).toBe(1);
    })

    test('update existing component version', async () => {
        const queryCountdoubleName = `INSERT INTO component_version
                                        (id, uuid, component_id, version, information, entry_file, publisher) 
                                    VALUES 
                                        ((SELECT COALESCE(MAX(id), 0) + 1 FROM component_version), $1, $2 , $3, $4 , $5, $6)`
        const updateExistingVersion = await pool.query(queryCountdoubleName, ['eea139d4-5127-445c-8c0b-c6fdba34d879', '1', 'componentNisha_new2version', 'information_Nisha', 'entry_file_nisha', 'nisha shukla']);
        expect(updateExistingVersion.rows.length).toBe(0);
    })
})