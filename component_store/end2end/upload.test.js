beforeEach(async () => {
    await page.goto(URL + '/upload', { waitUntil: "domcontentloaded" });
})

const testName = 'test-c';
const testVersion = '1.0.0';
const testPublisher = 'publisher';

describe('test upload workflow', () => {
    test(('inspect if component name is invalid'), async () => {
        const componentname = await page.$('input[id=componentName]');
        const input = await page.evaluate(componentname => componentname.validity.valueMissing, componentname);
        await expect(input).toBeTruthy();
    })

    test(('fill component name'), async () => {
        const testValue = 'test';
        await page.type('input[id=componentName]', testValue);
        const componentname = await page.$('input[id=componentName]');
        const input = await page.evaluate(componentname => componentname.value, componentname);
        await expect(input).toBe(testValue);
    })
    
    test(('fill mandatory fields and upload'), async () => {
        // add component name, version and publisher
        await page.type('input[id=componentName]', testName);
        await page.type('input[id=inputVersion]', testVersion);
        await page.type('input[id=publisher]', testPublisher);

        // confirm that values are inserted correctly
        let value = await page.$('input[id=componentName]');
        let input = await page.evaluate(fieldvalue => fieldvalue.value, value);
        await expect(input).toBe(testName);
        value = await page.$('input[id=inputVersion]');
        input = await page.evaluate(fieldvalue => fieldvalue.value, value);
        await expect(input).toBe(testVersion);
        value = await page.$('input[id=publisher]');
        input = await page.evaluate(fieldvalue => fieldvalue.value, value);
        await expect(input).toBe(testPublisher);

        // select a file
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('input[id=upload]')
        ])

        await fileChooser.accept(['./bin/example.js']);

        // add a website
        await page.type('input[id=website]', 'https://www.google.com');

        const button = await page.$('button[id=submitBtn]');
        const disabled = await page.evaluate(button => button.disabled, button);
        await expect(disabled).toBeFalsy();

        // click submit btn
        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click('button[id=submitBtn]'),
            page.waitForSelector('h3')
        ]);

        // wait for correct url
        expect(response.url()).toBe(URL + '/componentDetails/' + testName);
    }, 7000)

    test(('inspect uploaded component detail page'), async () => {
        await page.goto(URL + '/componentDetails/' + testName, { waitUntil: "domcontentloaded" });

        const title = await page.$('h3');
        const hasTitle = await page.evaluate(title => title.innerHTML, title);
        await expect(hasTitle).toBe('Your Component');

        let arg = [testName, testVersion, testPublisher];

        await page.evaluate((arg) => {
            const elements = [...document.querySelectorAll('dd.col-9')];
            let intersection = elements.filter(x => arg.includes(x));
            arg = intersection;
        }, arg);

        await expect(arg).toEqual([testName, testVersion, testPublisher]);
    })


    test(('check if uploaded component is visible on component page'), async () => {
        await page.goto(URL + '/componentlist', { waitUntil: "domcontentloaded" });

        let arg = '1- ' + testName;

        await page.evaluate((arg, testName) => {
            const elements = [...document.querySelectorAll('h5.card-title')];
            const hasTitle = elements.includes(arg);
            const elementsHref = [...document.querySelectorAll('a')];
            const hasHref = elementsHref.find(element => element.href === ('/componentDetails/' + testName));;
            hasHref ? arg = (true && hasTitle) : arg = (false && hasTitle);
        }, arg, testName);

        await expect(arg).toBeTruthy();

    })
})