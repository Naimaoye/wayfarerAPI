import express from 'express';
import Bookings from '../controllers/Bookings';
import Authentication from '../middleware/Authentication';

const router = express.Router();

// book a seat in a trip
router.post('/bookings', Authentication.verifyToken, Bookings.bookAtrip);

// get all bookings
router.get('/bookings', Authentication.verifyToken, Bookings.getAllBookings);

// user can delete their bookings
router.delete('/bookings/:booking_id', Authentication.verifyToken, Bookings.deleteBooking);

// user can change their seat number
router.patch('/bookings/:booking_id', Authentication.verifyToken, Bookings.changeSeat);


export default router;