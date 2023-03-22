exports.load = () => {
    if (process.env.NODE_ENV === 'test') {
        return {
            COMPONENTS_LIMIT_PER_PAGE: 6,
            DB_HOST: process.env.DB_HOST || '127.0.0.1',
            DB_PORT: process.env.DB_PORT_TEST || '5433',
            DB_DATABASE: process.env.DB_DATABASE_TEST || 'component-store-test',
            DB_USER: process.env.DB_USER_TEST || 'componento',
            DB_PASS: process.env.DB_PASS_TEST || 'secret'
        }
    }
    return {
            COMPONENTS_LIMIT_PER_PAGE: 6,
            DB_HOST: process.env.DB_HOST || '127.0.0.1',
            DB_PORT: process.env.DB_PORT || '5432',
            DB_DATABASE: process.env.DB_DATABASE || 'componentstore',
            DB_USER: process.env.DB_USER || 'componento',
            DB_PASS: process.env.DB_PASS || 'secret'
    }
}