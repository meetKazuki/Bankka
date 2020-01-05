import { should } from 'chai';
import { BaseError } from '../../src/helpers/error';
import errorHandler from '../../src/middleware/errorHandler';

should();

describe.skip('Error handler', () => {
  let request: any, response: any, next: any, nextCall: any = 0;
  const error = new Error('Error');

  beforeEach(() => {
    response = {
      status(code: any) {
        response.statusCode = code;
        return response;
      },
      json(data: any) {
        response.body = data;
      },
    };
    request = {};
    next = (): void => { nextCall += 1; };
  });

  it('should return 500 error status', async () => {
    errorHandler(error, request, response, next);
    response.status.should.eql(500);
  });
});
