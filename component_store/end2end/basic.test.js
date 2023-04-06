const childprocess = require('child_process');

beforeAll(async () => {
    await page.goto(URL, { waitUntil: "domcontentloaded"});
    childprocess.execSync(
        'knex migrate:rollback'
    );
    childprocess.execSync(
        'knex migrate:latest'
    );
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

const cases = [
    ['Components','View Components'],
    ['Update-component','Which component you want to update'],
    ['Upload','Upload new component']
];

test.each(cases)('navigate to %s page', async (arg, result) => {
    await page.evaluate((arg) => {
        const elements = [...document.querySelectorAll('a.nav-link')];
        const element = elements.find(element => element.innerHTML === arg);
        element.click();
    }, arg);
    const titleOutput = await page.waitForSelector('h3');
    const html = await page.evaluate(titleOutput => titleOutput.innerHTML, 
        titleOutput);
    expect(html).toBe(result);
})