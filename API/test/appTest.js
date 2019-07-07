import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;
let currentToken = "";

describe('Authentication Tests', () => {
  describe('User Sign Up Tests', () => {
    describe(`POST ${userEndPoint}signup`, () => {
      it('Should create a new user', (done) => {
        const user = {
          firstName: 'Chukwudi',
          lastName: 'Ngwobia',
          email: 'coolemail@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('isAdmin');
          done();
          });
      });

      it('Should return 400 if firstname is ommited', (done) => {
        const user = {
          lastName: 'Ngwobia',
          email: 'coolemail1@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if lastname is ommited', (done) => {
        const user = {
          firstName: 'Chukwudi',
          email: 'coolemail2@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if email is ommited', (done) => {
        const user = {
          firstName: 'Chukwudi',
          lastName: 'Ngwobia',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if email key is provided without value', (done) => {
        const user = {
          firstname: 'Chukwudi',
          lastname: 'Ngwobia',
          password: 'pA55w0rd',
          email: '',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 409 if email already exists', (done) => {
        const user = {
          firstName: 'Chukwudi',
          lastName: 'Ngwobia',
          email: 'kenny_g@gmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });


      it('Should return 400 if password is ommited', (done) => {
        const user = {
          firstname: 'Chukwudi',
          lastname: 'Ngwobia',
          email: 'coolemail5@testmail.com',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });

  describe('User Login tests', () => {
    describe(`POST ${userEndPoint}signin`, () => {
      it('Should login a user successfully', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
          password: 'password',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });

      it('Should deny access if wrong email is provided', (done) => {
        const login = {
          email: 'kcmykirl@gmail.com',
          password: 'password',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('The email and password you entered did not match our records. Please double-check and try again.');
            done();
          });
      });

      it('Should deny access if wrong password is provided', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
          password: 'passweod',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('The email and password you entered did not match our records. Please double-check and try again.');
            done();
          });
      });

      it('Should return 400 if email is not provided', (done) => {
        const login = {
          password: 'password',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if password is ommited', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });
});

//TRIP TEST
describe('Test trip endpoint', () => {
  describe('ADMIN CAN CREATE A TRIP', () => {
    describe(`POST ${apiEndPoint}trips`, () => {
      before((done) => {
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send({email: "kelvin@wayfarer.com", password: "password"})
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });
      it('should create a trip successfully', (done) => {
        const trip = {
         userId : 1030,
         destination: "ikoyi",
         origin: "iyana-ipaja",
         fare: 500.00
        };
        chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('authorization', currentToken)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('tripId');
            res.body.data.should.have.property('destination');
            res.body.data.should.have.property('origin');
            res.body.data.should.have.property('fare');
            done();
          });
      });
      it('should return an error if token was not provided', (done) => {
        const trip = {
          userId : 1030,
          destination: "ikoyi",
          origin: "iyana-ipaja",
          fare: 500.00
         };
        chai.request(app)
          .post(`${apiEndPoint}trips`)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
      it('should return an error if no trip details was provided', (done) => {
        chai.request(app)
          .post(`${apiEndPoint}trips`)
          .set('authorization', currentToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
       
    });
    // GET TRIPS
    describe('ADMIN CAN VIEW ALL CREATED TRIP', () => {
    describe(`GET ${apiEndPoint}trips`, () => {
      before((done) => {
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send({email: "kelvin@wayfarer.com", password: "password"})
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });

      it('Should throw an error if user is not authorized', (done) => {
        const user = {
          email: 'kcmykairl@gmail.com',
          password: "password"
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(user)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            chai.request(app)
              .get(`${apiEndPoint}trips`)
              .set('authorization', currentToken)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql('Only Admin can access this route');
                done();
              });
          });
      });
  
      it('should return all created trips', (done) => {
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send({email: "kelvin@wayfarer.com", password: "password"})
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            chai.request(app)
              .get(`${apiEndPoint}trips`)
              .set('authorization', currentToken)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('tripId');
                res.body.data[0].should.have.property('destination');
                res.body.data[0].should.have.property('fare');
                done();
              });
          });
      });
  
    });
  });
})
});
//TEST FOR BOOKINGS
describe('Test user seat Booking', () => {
  describe('POST /bookings', () => {
    before((done) => {
      chai.request(app)
      .post(`${userEndPoint}signin`)
      .send({email: "kimkarl@gmail.com", password: "password"})
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          done();
        });
    });

    it('should throw an error if user is not authorized', (done) => {
      chai.request(app)
      .post(`${userEndPoint}trip`)
      .send({email: "kelvin@wayfarer.com", password: "password"})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should book a seat successfully', (done) => {
      const bookSeat = {
       tripId : 1030,
       userId: 1050,
      };
      chai.request(app)
        .post(`${apiEndPoint}trips`)
        .set('authorization', currentToken)
        .send(bookSeat)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('tripId');
          res.body.data.should.have.property('bookingId');
          done();
        });
    });
    it('should return an error if token was not provided', (done) => {
      const trip = {
        userId : 1030,
        tripId : 1038
       };
      chai.request(app)
        .post(`${apiEndPoint}trips`)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.eql('Invalid or No token provided');
          done();
        });
    });
    it('should return an error if userId is not provided', (done) => {
      const trip = {
        tripId : 1038
       };
      chai.request(app)
        .post(`${apiEndPoint}trips`)
        .set('authorization', currentToken)
        .send(trip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

  });

  //GET
  describe('ADMIN CAN VIEW ALL BOOKINGS', () => {
    describe(`GET ${apiEndPoint}bookings`, () => {
      before((done) => {
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send({email: "kelvin@wayfarer.com", password: "password"})
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });

      it('Should throw an error if user is not authorized', (done) => {
        const user = {
          email: 'kcmykairl@gmail.com',
          password: "password"
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(user)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            chai.request(app)
              .get(`${apiEndPoint}bookings`)
              .set('authorization', currentToken)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql('Only Admin can access this route');
                done();
              });
          });
      });
  
      it('should return all bookings ', (done) => {
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send({email: "kelvin@wayfarer.com", password: "password"})
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            chai.request(app)
              .get(`${apiEndPoint}bookings`)
              .set('authorization', currentToken)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('userId');
                res.body.data[0].should.have.property('busId');
                res.body.data[0].should.have.property('bookingId');
                done();
              });
          });
      });
  
      it('should return an error if token was not provided', (done) => {
        const trip = {
          userId : 1030,
          isAdmin: true
         };
        chai.request(app)
          .post(`${apiEndPoint}bookings`)
          .send(trip)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
    });
  });

  describe('USER CAN VIEW PERSONAL BOOKINGS', () => {
    describe(`GET ${apiEndPoint}bookings/:userId`, () => {
      before((done) => {
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send({email: "kcmykairl@gmail.com", password: "password"})
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            done();
          });
      });

      it('Should throw an error if user is not authorized', (done) => {
        const user = {
          email: 'kelvin@wayfarer.com',
          password: "password"
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(user)
          .end((loginErr, loginRes) => {
            currentToken = `Bearer ${loginRes.body.data.token}`;
            chai.request(app)
              .get(`${apiEndPoint}bookings/:userId`)
              .set('authorization', currentToken)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql(' Admin cannot access this route');
                done();
              });
          });
      });
  
      it('should return an error if token was not provided', (done) => {
        const book = {
          userId : 1030,
          isAdmin: false
         };
        chai.request(app)
          .post(`${apiEndPoint}bookings/:userId`)
          .send(book)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.eql('Invalid or No token provided');
            done();
          });
      });
      it('should return an error if userId is not provided', (done) => {
        const book = {
          isAdmin: false
         };
        chai.request(app)
          .post(`${apiEndPoint}bookings/:userId`)
          .set('authorization', currentToken)
          .send(book)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      
    });
  });
});

//DELETE BOOKINGS
describe('Delete a booking test', () => {
  describe(`DELETE ${apiEndPoint}bookings/:bookingId`, () => {
    it('should delete a booking successfully', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };
      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          const bookingId = 1058;

          chai.request(app)
            .delete(`${apiEndPoint}bookings/${bookingId}`)
            .set('Authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('message');
              done();
            });
        });
    });

    it('Should return 404 if bookingId does not exist', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          const bookingId = 1758;

          chai.request(app)
            .delete(`${apiEndPoint}bookings/${bookingId}`)
            .set('Authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
    });
  });
});

//ADMIN CAN CANCEL TRIP
describe(`PATCH ${apiEndPoint}trips/:tripId`, () => {
  const tripId = 1;
  const wrongId = 'A';
  before((done) => {
    chai.request(app)
      .post(`${userEndPoint}signin`)
      .send({email: "kelvin@wayfarer.com", password: "password"})
      .end((loginErr, loginRes) => {
        currentToken = `Bearer ${loginRes.body.data.token}`;
        done();
      });
  });
  it('should cancel a trip successfully', (done) => {
    chai.request(app)
      .patch(`${apiEndPoint}trips/2`)
      .set('authorization', currentToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should return error if the tripId is incorrect', (done) => {
    server()
      .patch(`${apiEndPoint}trips/${wrongId}`)
      .set('authorization', currentToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});