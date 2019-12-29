import appRoot from 'app-root-path';
import winston from 'winston';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
    new winston.transports.File({
      level: 'error',
      filename: `${appRoot}/logs/app.error.log`,
    }),
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('logging init at debug level');
}

export default logger;
