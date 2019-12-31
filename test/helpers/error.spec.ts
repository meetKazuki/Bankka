import debug from 'debug';
import { should } from 'chai';
import { BaseError } from '../../src/helpers/error';

const DEBUG = debug('test');

should();

describe('Error helper', () => {
  describe('Base Error', () => {
    it('should set statusCode to 500 if error code is not defined', async () => {
      const error = new BaseError();

      error.should.have.property('statusCode');
      error.statusCode.should.eql(500);
    });

    it('should set statusCode to defined statusCode', async () => {
      const error = new BaseError(404);
      DEBUG(error);

      error.should.have.property('status');
      error.statusCode.should.eql(404);
    });

    it.skip('should set error message', async () => {
      const error = new BaseError(404, 'resource not found');
      DEBUG(error);

      error.should.have.property('message');
      error.message.should.eql('resource not found');
    });
  });
});
