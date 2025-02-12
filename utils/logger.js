const winston = require('winston');

//Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss A' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

//Create a logger instance
const logger = winston.createLogger({
  level: 'info', // default logging level
  format: logFormat,
  transports: [
    //log to the console
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),

    //error log
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    //all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

module.exports = logger;

//logger.info
//logger.warn
//logger.error
