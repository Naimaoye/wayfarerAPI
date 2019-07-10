import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);


let Token;
let Token1;
let Booking_id;
let Trip_id;
const bookingsUrl = '/api/v1/bookings';
const signinUrl = '/api/v1/auth/signin';

describe(`POST ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.token;
        done();
      });
  });

  it('should book a trip successfully', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token)
      .send({ trip_id: `${Trip_id}`, seat_number: 1 })
      .end((err, res) => {
        Booking_id = body.data.booking_id;
        Trip_id = body.data.trip_id;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
        done();
      });
  });

  it('should return 400 if trip has been booked by user', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token)
      .send({ trip_id: `${Trip_id}`, seat_number: 1 })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('You already booked a seat for the trip');
        done();
      });
  });
  it('should return 404 if trip is not found', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token)
      .send({ trip_id: 90000000, seat_number: 2 })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Trip not found!');
        done();
      });
  });
  it('should return 400 if seat has been occupied for a seat', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: `${Trip_id}`, seat_number: 1 })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Seat has been occuppied, choose another seat');
        done();
      });
  });
  it('should return 400 if trip_id is not a number', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: 'kas', seat_number: 2 })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Trip ID must be an Integer number!');
        done();
      });
  });

  it('should return 400 if seat number is not a number', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: 18, seat_number: 'yt' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Seat number must be an Integer number!');
        done();
      });
  });
});


describe(`GET ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.token;
        done();
      });
  });
  it('should get all bookings, if its admin', (done) => {
    chai
      .request(app)
      .get(bookingsUrl)
      .set('token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should all bookings in peculiar to a user', (done) => {
    chai
      .request(app)
      .get(bookingsUrl)
      .set('token', Token1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Not found');
        done();
      });
  });
});


describe(`PATCH ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.token;
        done();
      });
  });
  it('should change bookings seat successfully', (done) => {
    chai
      .request(app)
      .patch(`${bookingsUrl}/${Booking_id}`)
      .set('token', Token)
      .send({ trip_id: `${Trip_id}`, seat_number: 7 })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return 404 and not change bookings seat', (done) => {
    chai
      .request(app)
      .patch(`${bookingsUrl}/${Booking_id}`)
      .set('token', Token1)
      .send({ trip_id: `${Trip_id}`, seat_number: 7 })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Seat has been occuppied, choose another seat');
        done();
      });
  });

});


describe(`DELETE ${bookingsUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.token;
        done();
      });
  });

  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'jamesdoe@gmail.com', password: 'jamesdoe' })
      .end((err, res) => {
        const { body } = res;
        Token1 = body.token;
        done();
      });
  });
  it('should delete user bookings', (done) => {
    chai
      .request(app)
      .delete(`${bookingsUrl}/${Booking_id}`)
      .set('token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Deleted successfully');
        done();
      });
  });

  it('should return 404 if booking is not found', (done) => {
    chai
      .request(app)
      .delete(`${bookingsUrl}/78`)
      .set('token', Token1)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Not Found');
        done();
      });
  });

  it('should return 400 if booking id is not an integer', (done) => {
    chai
      .request(app)
      .delete(`${bookingsUrl}/ure`)
      .set('token', Token1)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Params must be integer!');
        done();
      });
  });

  it('should cancel a trip successful', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${Trip_id}`)
      .set('token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should not book a cancelled trip', (done) => {
    chai
      .request(app)
      .post(bookingsUrl)
      .set('token', Token1)
      .send({ trip_id: `${Trip_id}`, seat_number: 2 })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('This trip has been canceled, you can not book it');
        done();
      });
  });
});
