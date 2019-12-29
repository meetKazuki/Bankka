import { expect } from 'chai';
import app from '../src/app';

describe('app test suite', () => {
  it('should ensure app is properly setup', (done) => {
    expect(app).to.be.a('function');
  });
});
