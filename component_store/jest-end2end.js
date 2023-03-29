module.exports = {
    preset: 'jest-puppeteer',
    globals: {
        URL: 'http://localhost:' + (process.env.PORT || 3000)
    },
    testMatch: [
        '<rootDir>/end2end/**/*.js'
    ],
    testPathIgnorePatterns: [
        '__test__'
    ]
}