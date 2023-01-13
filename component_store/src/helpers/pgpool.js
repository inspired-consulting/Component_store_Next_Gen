
const { Pool } = require('pg');

const poolConfig = {
    host: '127.0.0.1',
    port: 25443,
    user: 'postgres',
    password: 'password',
    database: 'componentstore'
};

let pool;

module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = new Pool(poolConfig);
        return pool;
    }
}