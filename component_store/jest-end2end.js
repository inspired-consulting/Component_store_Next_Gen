module.exports = {
    preset: 'jest-puppeteer',
    globals: {
        URL: 'http://localhost:3006'
    },
    testMatch: [
        '<rootDir>/end2end/**/*.js'
    ],
    testPathIgnorePatterns: [
        '__test__'
    ]
}