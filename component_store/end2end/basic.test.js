const childprocess = require('child_process');

beforeAll(async () => {
    await page.goto(URL, { waitUntil: "domcontentloaded"})
    childprocess.execSync(
        'knex migrate:latest'
    )
});

afterAll(async () => {
    childprocess.execSync(
        'knex migrate:rollback'
    )
});

test('display home and show first subtitle', async () => {
    const titleOutput = await page.$('h2');
    const html = await page.evaluate(titleOutput => titleOutput.innerHTML, 
        titleOutput);
    expect(html).toBe('How Componento works');
})

test('navigate to components page', async () => {
    await page.evaluate(() => {
        const elements = [...document.querySelectorAll('a.nav-link')];
        const element = elements.find(element => element.innerHTML === 'Components');
        element.click();
    });
    const titleOutput = await page.waitForSelector('h3');
    const html = await page.evaluate(titleOutput => titleOutput.innerHTML, 
        titleOutput);
    expect(html).toBe('View Components');
    // is the docker container running?
})