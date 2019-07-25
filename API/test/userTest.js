import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctUser, undefinedFirstName, invalidFirstNameLength,
  invalidFirstNameCharacter, undefinedLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, invalidEmailCharacter,
  existingEmail, undefinedPassword, invalidPasswordLength, emptyEmail,
  emptyFirstName, emptyLastName, correctLogin, undefinedEmailLogin, undefinedPasswordLogin,
  nonExistingEmail, emptyPasswordField, emptyEmailField, correctEmailIncorrectPassword,
} from './mockData/mockUser';

// Define the expect assertion
const { expect } = chai;

// chai middleware
// chai.use(chaiHttp);

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';


describe(`POST ${signupUrl}`, () => {

  it('Should return 400 if first name is ommited', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedFirstName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  
  it('Should return 400 if fist name lenght less is than 2', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidFirstNameLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if Invalid first name format is entered', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidFirstNameCharacter)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if lastName is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedLastName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if last name lenght less is than 2', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidLastNameLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if Invalid last name format is entered', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidLastNameCharacter)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if email is ommited', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Valid email field is required');
        done();
      });
  });


  it('Should return 400 if Invalid Email Address is entered', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidEmailCharacter)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Valid email field is required');
        done();
      });
  });

  it('Should return 400  if Password field is omitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedPassword)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        done();
      });
  });

  it('Should return 400 if Password length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidPasswordLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        done();
      });
  });

  it('Should return 400 if email is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        done();
      });
  });

  it('Should return 400 if firstName is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyFirstName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('First name field is required with min length of 3 and must be alphabet');
        done();
      });
  });

  it('Should return 400 if lastName is empty', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyLastName)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('last name field is required with min length of 3 and must be alphabet');
        done();
      });
  });
});


describe(`POST ${signinUrl}`, () => {
  it('should return 400 if no password', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(undefinedPasswordLogin)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('status');
        expect(body).to.have.a.property('error');
        expect(body.error).to.be.equal('you must provide a correct password');
        done();
      });
  });

  it('should return 404 if login not found', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(nonExistingEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('status');
        expect(body).to.have.a.property('error');
        done();
      });
  });

  it('should return 400 if no password provided', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(emptyPasswordField)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('status');
        expect(body).to.have.a.property('error');
        expect(body.error).to.be.equal('you must provide a correct password');
        done();
      });
  });

  it('should return 400 if no email provided', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(emptyEmailField)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('status');
        expect(body).to.have.a.property('error');
        expect(body.error).to.be.equal('Email is required');
        done();
      });
  });
});