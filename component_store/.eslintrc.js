module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: 'standard',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'no-console': 0,
        indent: ['error', 4],
        semi: 0,
        'eol-last': 0
    }
}
