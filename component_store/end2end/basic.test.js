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

test('test title of page', async () => {
    const title = await page.title();
    expect(title).toBe('Component store');
})

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

test('navigate to update page', async () => {
    // navigateTo('Update-component','Which component you want to update');
    await page.evaluate(() => {
        const elements = [...document.querySelectorAll('a.nav-link')];
        const element = elements.find(element => element.innerHTML === 'Update-component');
        element.click();
    });
    const titleOutput = await page.waitForSelector('h3');
    const html = await page.evaluate(titleOutput => titleOutput.innerHTML, 
        titleOutput);
    expect(html).toBe('Which component you want to update');
})