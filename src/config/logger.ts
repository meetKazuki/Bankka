import appRoot from 'app-root-path';
import { config } from 'dotenv';
import { createLogger, format, transports } from 'winston';

config();

const logger = createLogger({
  format: format.combine(
    format.align(),
    format.simple(),
    format.timestamp(),
  ),
  transports: [
    new (transports.Console)({
      format: format.combine(
        format.align(),
        format.colorize(),
        format.simple(),
        format.timestamp(),
      ),
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      handleExceptions: true,
    }),
    new (transports.File)({
      level: 'info',
      filename: `${appRoot}/logs/app.info.log`,
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('logging init at debug level');
}

export default logger;
