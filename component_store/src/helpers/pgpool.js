
const { Pool } = require('pg');
const Configuration = require('../../config/config')
const config = Configuration.load();

const poolConfig = {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_DATABASE
};

let pool;

module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = new Pool(poolConfig);
        return pool;
    }
}