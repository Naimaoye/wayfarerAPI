import express from 'express';
import Trip from '../controllers/Trip';
import Authentication from '../middleware/Authentication';

const router = express.Router();

// admin can create trip
router.post('trips', Authentication.verifyToken, Trip.createAtrip);

// admin can add bus to database
router.post('trips/bus', Authentication.verifyToken, Trip.addBusForTrip);

// user can filter trips using destination or origin, while admin can view all trip
router.get('trips', Authentication.verifyToken,
  Trip.getTripByDestOrOrigin,
Trip.getAllTrips);

// // admin and user can get all trips
// router.get('/trips', Authentication.verifyToken, Trip.getAllTrips);

// admin can cancel a trip
router.patch('/trips/:trip_id', Authentication.verifyToken, Trip.cancelATrip);

export default router;
