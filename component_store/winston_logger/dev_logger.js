// const { createLogger, transports, format } = require('winston');
// const { timestamp, combine, printf } = format;

// const customFormat = combine(timestamp(), printf((info) => {
//     return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
// }))

// const devLogger = createLogger({
//     format: customFormat,
//     transports: [
//         new transports.Console({ level: 'silly' }),
//         new transports.File({ filename: 'console.log', level: 'info' })
//     ]
// });

// module.exports = devLogger;

const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format;

function devLogger () {
    const logFormat = printf((info) => {
        if (info instanceof Error) {
            return `${info.timestamp} [${info.level}]: ${info.stack || info.message}`;
        }
        return `${info.timestamp} [${info.level}]: ${info.message}`;
    });

    return createLogger({
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            new transports.Console({ handleExceptions: true, level: 'silly' }),
            new transports.File({ filename: './winstonlogs/logInfos.log', level: 'info' }),
            new transports.File({ filename: './winstonlogs/logErrors.log', level: 'error' })
        ],
        rejectionHandlers: [
            new transports.File({ filename: './winstonlogs/logRejections.log' })
        ]
    });
}

module.exports = devLogger;