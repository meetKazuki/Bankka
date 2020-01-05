import path from 'path';
import rootPath from 'app-root-path';
import winston, { format, transports } from 'winston';
import 'winston-daily-rotate-file';

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger;
    }
  }
}

let isProduction: boolean;

export default class Logger {
  /**
   * @method logger
   * @description configures the winston logger
   *
   * @static
   * @memberof User
   * @param {string}
   *
   * @returns {Object} winston logger instance
   */
  static logger(filename = 'console.log'): any {
    const rotateFileTransport = new transports.DailyRotateFile({
      filename: path.join(`${rootPath}`, 'logs', `/%DATE%-${filename}`),
      datePattern: 'YYYY-MM-DD',
    });
    let level;

    switch (process.env.NODE_ENV) {
      case 'production':
        level = 'debug';
        isProduction = true;
        break;
      case 'test':
        level = 'silly';
        break;

      default:
        level = 'debug';
        break;
    }

    return winston.createLogger({
      level,
      format: format.combine(
        isProduction ? format.uncolorize() : format.colorize(),
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ssa',
        }),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      transports: [
        isProduction ? rotateFileTransport : new transports.Console(),
      ],
    });
  }

  /**
   * @method stream
   * @description used by morgan to pipe stream through winston
   *
   * @static
   * @memberof Logger
   */
  static stream(): Logger {
    return {
      write: (message: any) => { Logger.log(message); },
    };
  }

  /**
   * @method log
   * @description prints text to console with info label in development and to file
   * in production
   *
   * @static
   * @memberof Logger
   * @param message text info to display
   * @param filename file to print to in production (defaults to console.log)
   *
   * @returns {void}
   */
  static log(message: string, filename?: string): void {
    Logger.logger(filename).info(message);
  }

  /**
   * @method error
   * @description prints text to console with error label in development and to file
   * in production
   *
   * @static
   * @memberof Logger
   * @param message text info to display
   * @param filename file to print to in production (defaults to console.log)
   *
   * @returns {void}
   */
  static error(message: string, filename?: string): any {
    Logger.logger(filename).error(message);
  }

  /**
   * @method config
   * @description makes the logger class global and easy to access. Simply calls
   * logger.log() or logger.error(). Without calling this method, you'll need to
   * import this module when needed.
   *
   * @static
   * @memberof Logger
   *
   * @returns {void}
   */
  static config(): void {
    global.logger = Logger;
  }
}
