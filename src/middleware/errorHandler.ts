import debug from 'debug';

require('dotenv').config();

const DEBUG = debug('dev');

/**
 * @function
 * @description a wrapper for error handling
 *
 * @param {Object} err error object
 * @param {_} _ null
 * @param {Object} response express response object
 * @param {Function} next callback function to the next middleware
 *
 * @returns {Object} error response from the server
 */
export default (err: any, _: any, response: any, next: any): object => {
  const isProduction: boolean = process.env.NODE_ENV === 'production';
  let errorMessage = {};

  if (response.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    DEBUG(err.stack);
    errorMessage = err;
  }

  return response.status(err.status || 500).json({
    status: 'error',
    error: {
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(isProduction && { trace: errorMessage }),
    },
  });
};
