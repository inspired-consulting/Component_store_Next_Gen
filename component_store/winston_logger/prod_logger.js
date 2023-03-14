// const { createLogger, transports, format } = require('winston');
// const { timestamp, combine, printf } = format;

// const customFormat = combine(timestamp(), printf((info) => {
//     return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
// }))

// const prodLogger = createLogger({
//     format: customFormat,
//     transports: [
//         new transports.Console({ level: 'silly' }),
//         new transports.File({ filename: 'console.log', level: 'info' })
//     ]
// });

// module.exports = prodLogger;

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