module.exports = {
    preset: 'jest-puppeteer',
    globals: {
        URL: 'http://localhost:3006'
    },
    testMatch: [
        '<rootDir>/__test__/end2end/**/*.js'
    ],
    testPathIgnorePatterns: [
        '__test__/integration_test',
        '__test__/unit_test'
    ]
}