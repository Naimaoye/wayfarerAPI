import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaiHttp);

describe('test', () => {
    it('should return a string', () => {
      expect('ci with travis').to.equal('ci with travis');
    });
  });