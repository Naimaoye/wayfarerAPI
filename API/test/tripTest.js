import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctTripDetails,
  undefinedTripBusId,
  incorrectTripBusId,
  undefinedTripOrigin,
  undefinedTripDestination,
  undefinedTripDate,
  undefinedTripFare,
  correctBusDetails,
  undefinedNumberPlate, undefinedBusManufacturer, undefinedBusModel, undefinedBusYear,
  undefinedBusCapacity, conflictTripDetails,
} from './mockData/mockTrip';


// Define the expect assertion
const { expect } = chai;

// chai middleware
chai.use(chaiHttp);

let Token;
let Token1;
let Trip_id;
const tripUrl = '/api/v1/trips';
const signinUrl = '/api/v1/auth/signin';
const busUrl = '/api/v1/trips/bus';


describe(`POST ${tripUrl}`, () => {
  it('should successfully login user', (done) => {
    chai
      .request(app)
      .post(signinUrl)
      .send({ email: 'kzmobileapp@gmail.com', password: 'Kazeem27' })
      .end((err, res) => {
        const { body } = res;
        Token = body.data.token;
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
        Token1 = body.data.token;
        done();
      });
  });

  it('should create a trip successful', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(correctTripDetails)
      .end((err, res) => {
        const { body } = res;
        Trip_id = body.data.trip_id;
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body.data).to.be.have.property('bus_id');
        expect(body.data).to.be.have.property('origin');
        expect(body.data).to.be.have.property('destination');
        expect(body.data).to.be.have.property('trip_date');
        expect(body.data).to.be.have.property('status');
        done();
      });
  });

  it('should return 403 if not admin', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token1)
      .send(correctTripDetails)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(403);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('status');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Unauthorized!, Admin only route');
        done();
      });
  });

  it('should return 403 if not admin', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token1)
      .send(correctBusDetails)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(403);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('status');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Unauthorized!, Admin only route');
        done();
      });
  });


  it('should return 409 if bus has been schedule for a trip', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(conflictTripDetails)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(409);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('The bus has been schedule for another trip for same date');
        done();
      });
  });

  it('Should return 400 if bus ID is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(undefinedTripBusId)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('bus id is required and should be an integer number');
        done();
      });
  });

  it('Should return 400 if bus id is incorrect', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(incorrectTripBusId)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('No bus with such ID found');
        done();
      });
  });

  it('Should return 400 if destination is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(undefinedTripDestination)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('destination is required and should not be less than 3 characters and must be lowercase');
        done();
      });
  });

  it('Should return 400 if trip origin is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(undefinedTripOrigin)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('origin is required and should not be less than 3 characters and must be lowercase');
        done();
      });
  });

  it('Should return 400 if trip date is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(undefinedTripDate)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('trip date is required');
        done();
      });
  });
  it('Should return 400 if trip Fare is omitted', (done) => {
    chai
      .request(app)
      .post(tripUrl)
      .set('authorization', Token)
      .send(undefinedTripFare)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('fare is required and can not be less than $1');
        done();
      });
  });
});


describe(`POST ${busUrl}`, () => {
  it('should add a bus successful', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token)
      .send(correctBusDetails)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body.data).to.be.have.property('number_plate');
        expect(body.data).to.be.have.property('manufacturer');
        expect(body.data).to.be.have.property('model');
        expect(body.data).to.be.have.property('year');
        expect(body.data).to.be.have.property('capacity');
        done();
      });
  });

  it('Should return 400 if number plate is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token)
      .send(undefinedNumberPlate)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal("Number plate is required with this format 'BLAG-017' and must start with B");
        done();
      });
  });

  it('Should return 400 if bus manufacturer is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token)
      .send(undefinedBusManufacturer)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('bus manufacturer is required');
        done();
      });
  });

  it('Should return 400 if bus model is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token)
      .send(undefinedBusModel)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('bus model is required');
        done();
      });
  });

  it('Should return 400 bus year is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token)
      .send(undefinedBusYear)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Correct year format is required');
        done();
      });
  });

  it('Should return 400 error if bus capacity is omitted', (done) => {
    chai
      .request(app)
      .post(busUrl)
      .set('authorization', Token)
      .send(undefinedBusCapacity)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.be.have.property('error');
        expect(body.error).to.be.equal('Bus capacity is required');
        done();
      });
  });
});


describe(`GET ${tripUrl}`, () => {
  it('should get trips successful', (done) => {
    chai
      .request(app)
      .get(tripUrl)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('data');
        expect(body.data).to.be.an('array');
        done();
      });
  });
  it('should filter trips successful', (done) => {
    chai
      .request(app)
      .get(`${tripUrl}?origin=yaba`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('data');
        expect(body.data).to.be.an('array');
        done();
      });
  });
  it('should filter trips successful', (done) => {
    chai
      .request(app)
      .get(`${tripUrl}?destination=ikoyi`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('data');
        expect(body.data).to.be.an('array');
        done();
      });
  });
  it('should not filter trips successful', (done) => {
    chai
      .request(app)
      .get(`${tripUrl}?destination=Ikoyi`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should filter trips successful', (done) => {
    chai
      .request(app)
      .get(`${tripUrl}?origin=Ikoyi`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should return 404 if wrong origin', (done) => {
    chai
      .request(app)
      .get(`${tripUrl}?origin=abia`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('error');
        done();
      });
  });
  it('should return 404 if wrong destination', (done) => {
    chai
      .request(app)
      .get(`${tripUrl}?destination=ilupej`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('error');
        done();
      });
  });
});

describe(`UPDATE ${tripUrl}`, () => {
  it('should cancel a trip successful', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/trips/${Trip_id}`)
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('data');
        done();
      });
  });

  it('should return 404 if trip is not present', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/10000')
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('error');
        done();
      });
  });

  it('should not cancel a trip with invalid params', (done) => {
    chai
      .request(app)
      .patch('/api/v1/trips/1.5')
      .set('authorization', Token)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(res.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body.error).to.be.equal('Params must be integer!');
        done();
      });
  });
});
