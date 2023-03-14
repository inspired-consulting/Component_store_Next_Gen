const buildDevLogger = require('./dev_logger');
const buildProdLogger = require('./prod_logger');

let logger = null;
if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
    // logger.silent = true;
} else {
    logger = buildProdLogger();
    // logger.silent = true;
}

module.exports = logger;