
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json, prettyPrint } = format;

function prodLogger () {
    return createLogger({
        format: combine(timestamp(), errors({ stack: true }), json(), prettyPrint()),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({ filename: './winstonlogs/logInfos.log', level: 'info' }),
            new transports.File({ filename: './winstonlogs/logErrors.log', level: 'error' })
        ],
        rejectionHandlers: [
            new transports.File({ filename: './winstonlogs/logRejections.log' })
        ]
    });
}

module.exports = prodLogger;