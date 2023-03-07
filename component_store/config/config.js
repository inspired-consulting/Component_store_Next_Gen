
exports.load = () => {
    return {
        COMPONENTS_LIMIT_PER_PAGE: 6,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT || '5432',
        DB_DATABASE: process.env.DB_DATABASE || 'componentstore',
        DB_USER: process.env.DB_USER || 'componento',
        DB_PASS: process.env.DB_PASS || 'secret'
    }
}