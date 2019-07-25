import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctUser, undefinedFirstName, undefinedAddress, invalidFirstNameLength,
  invalidFirstNameCharacter, undefinedLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, invalidAddressLength, invalidEmailCharacter,
  existingEmail, undefinedPassword, invalidPasswordLength, emptyAddress, emptyEmail,
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
  it('should signup user successful', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(correctUser)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('token');
        expect(body.data).to.be.have.property('first_name');
        expect(body.data).to.be.have.property('last_name');
        expect(body.data).to.be.have.property('address');
        expect(body.data).to.be.have.property('is_admin');
        expect(body.data).to.be.have.property('email');
        done();
      });
  });

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

  it('Should return 400 if Address is ommited', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(undefinedAddress)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Address field is required and should not be less than 25 characters');
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

  it('Should return 400 if address length does not meet the minimum', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(invalidAddressLength)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Address field is required and should not be less than 25 characters');
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

  it('Should return 409 if Email Address already exist', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(existingEmail)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(409);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('User already exist');
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
        expect(body.error).to.be.equal('Password field is required with mininum 6 characters');
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
        expect(body.error).to.be.equal('Password field is required with mininum 6 characters');
        done();
      });
  });

  it('Should return 400 if address is omitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .send(emptyAddress)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Address field is required and should not be less than 25 characters');
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
        expect(body.error).to.be.equal('Valid email field is required');
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
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(correctLogin)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('status');
        expect(body).to.have.a.property('token');
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(undefinedEmailLogin)
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

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(undefinedEmailLogin)
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
        expect(body.error).to.be.equal('User not Found');
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

  it('should return 401 if incorrect email or password', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send(correctEmailIncorrectPassword)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.equal(401);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('status');
        expect(body).to.have.a.property('error');
        expect(body.error).to.be.equal('Email/Password incorrect');
        done();
      });
  });
});
