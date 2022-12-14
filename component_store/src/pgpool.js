'use strict';

const { Pool } = require('pg');

const poolConfig = {
    host: "localhost",
    port: 25432,
    user: "postgres",
    password: "password",
    database: "componentstore",
};

var pool;

module.exports = {
    getPool: function () {
        if (pool) return pool; // if it is already there, grab it here
        pool = new Pool(poolConfig);
        return pool;
    }
}