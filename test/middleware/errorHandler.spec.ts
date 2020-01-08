import debug from 'debug';
import { should } from 'chai';
import { BaseError } from '../../src/helpers/error';
import errorHandler from '../../src/middleware/errorHandler';

should();

const DEBUG = debug('test');

describe('Error handler', () => {
  let request: any, response: any, next: any, nextCall: any = 0;
  const error: any = new Error('Error');

  beforeEach(() => {
    response = {
      status(code: number): number {
        response.statusCode = code;
        return response;
      },
      json(data: object): void {
        response.body = data;
      },
    };
    request = {};
    next = (): void => { nextCall += 1; };
  });

  it('should return 500 error status', async () => {
    errorHandler(error, request, response, next);
    response.statusCode.should.eql(500);
  });

  it('should not return error stack trace in production environment', async () => {
    process.env.NODE_ENV = 'production';
    error.status = 403;

    errorHandler(error, request, response, next);

    response.statusCode.should.eql(403);
    response.body.status.should.eql('error');
    response.body.error.message.should.eql('Error');
    response.body.error.should.not.have.property('trace');
  });

  it('should return error stack trace in development environment', async () => {
    process.env.NODE_ENV = 'development';
    error.status = 403;

    errorHandler(error, request, response, next);

    response.statusCode.should.eql(403);
    response.body.status.should.eql('error');
    response.body.error.message.should.eql('Error');
    response.body.error.should.have.property('trace');
  });

  it('should call next() when response headers have already been sent', () => {
    response.headersSent = true;

    errorHandler(error, request, response, next);

    nextCall.should.equal(1);
    response.should.not.have.property('body');
  });

  it.skip('should have an errors field', async () => {
    process.env.NODE_ENV = 'production';
    const clientError = new BaseError(400, 'invalid input', ['invalid input']);

    DEBUG('Almighty ==>', errorHandler(clientError, request, response, next));

    response.status.should.eql(400);
    response.body.status.should.eql('error');
    response.body.error.errors.should.not.be.empty;
  });
});
