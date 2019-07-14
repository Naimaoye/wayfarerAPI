import express from 'express';
import Trip from '../controllers/Trip';
import Authentication from '../middleware/Authentication';

const router = express.Router();

// admin can create trip
router.post('/trips', Authentication.verifyToken, Trip.createAtrip);

// admin can add bus to database
router.post('/trips/bus', Authentication.verifyToken, Trip.addBusForTrip);

export default router;
