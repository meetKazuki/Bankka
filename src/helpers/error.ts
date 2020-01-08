/**
 * @class BaseError
 * @description base error class
 * @extends Error
 *
 * @param {number} statusCode status code
 * @param {string} message error message
 * @param {Array} errors an array of errors
 */
export class BaseError extends Error {
  statusCode!: number;
  message: string;
  errors: any[];

  constructor(statusCode?: number, message = 'an error occurred', errors?: any[]) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.errors = errors;
  }
}

/**
 * @class NotFoundError
 * @description error for resource(s) not found
 * @extends BaseError
 */
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(404, message || 'resource not found');
  }
}
