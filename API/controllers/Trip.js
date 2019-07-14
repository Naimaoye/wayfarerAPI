import db from '../migrations/Db';
import CheckForValidInput from '../helper/checkValidInput';
import {
  createTripQuery,
  createBusQuery,
} from '../models/query/tripQuery';

class Trip {
  /**
   * Admin can add bus for a trip
   * @param {*} req
   * @param {*} res
   */
  static async addBusForTrip(req, res) {
    // check for admin user
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized!, Admin only route',
      });
    }

    const { error } = CheckForValidInput.addBusForTrip(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const values = [
      req.body.number_plate,
      req.body.manufacturer,
      req.body.model,
      req.body.year,
      req.body.capacity,
      new Date(),
    ];
    try {
      const { rows } = await db.query(createBusQuery, values);

      return res.status(201).json({
        status: 'success',
        data: rows[0],
      });
    } catch (errors) {
      if (errors.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Bus already exist!',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }

  /**
   * Admin can create a trip
   * @param {*} req
   * @param {*} res
   */
  static async createAtrip(req, res) {
    // check for admin user
    if (!req.user.is_admin) {
      return res.status(403).json({
        status: 'error',
        error: 'Unauthorized!, Admin only route',
      });
    }

    const { error } = CheckForValidInput.createAtrip(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const values = [
      req.body.bus_id,
      new Date(),
      req.body.origin,
      req.body.destination,
      req.body.trip_date,
      req.body.fare,
      'active',
      new Date(),
    ];
    try {
      const bus = await db.query(checkIfBusIsAvailableQuery,
        [req.body.trip_date, req.body.bus_id, 'active']);
      if (bus.rows[0]) {
        return res.status(409).json({
          status: 'error',
          error: 'The bus has been schedule for another trip for same date',
        });
      }
      const { rows } = await db.query(createTripQuery, values);
      return res.status(201).json({
        status: 'success',
        data: rows[0],
      });
    } catch (errors) {
      if (errors.routine === 'ri_ReportViolation') {
        return res.status(400).json({
          status: 'error',
          error: 'No bus with such ID found',
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }



}

export default Trip;
