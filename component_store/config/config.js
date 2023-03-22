exports.load = () => {
    const configobject = {
        COMPONENTS_LIMIT_PER_PAGE: 6,
        DB_HOST: process.env.DB_HOST || '127.0.0.1',
        DB_PORT: process.env.DB_PORT || '5432',
        DB_DATABASE: process.env.DB_DATABASE || 'componentstore',
        DB_USER: process.env.DB_USER || 'componento',
        DB_PASS: process.env.DB_PASS || 'secret'
    }

    if (process.env.NODE_ENV === 'test') {
        configobject.DB_PORT = process.env.DB_PORT_TEST || '5433'
        configobject.DB_DATABASE = process.env.DB_PORT_TEST || 'component-store-test'
        configobject.DB_PASS = process.env.DB_PASS_TEST || 'secret'
        return configobject;
    }
    return configobject;
}