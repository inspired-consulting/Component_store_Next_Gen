const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, prettyPrint } = format;

function buildProdLogger () {
    return createLogger({
        level: process.env.LOGLEVEL || 'info',
        format: combine(
            timestamp(),
            errors({ stack: true }),
            json(),
            prettyPrint()
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            // new transports.Console(),
            new transports.File({ filename: './logs/loglevels-prod.log' })
        ],
        rejectionHandlers: [
            new transports.File({ filename: './logs/rejections-prod.log' })
        ]
    });
}

module.exports = buildProdLogger();