const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

function buildDevLogger () {
    const logdevFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        level: 'debug',
        format: combine(
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logdevFormat
        ),
        transports: [
            new transports.Console()
        ],
        rejectionHandlers: [
            new transports.File({ filename: './logs/rejections.log' })
        ]
    });
}

module.exports = buildDevLogger();