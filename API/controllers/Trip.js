import db from '../migrations/Db';
import CheckForValidInput from '../helper/checkValidInput';
import {
  createTripQuery,
  createBusQuery,
  getAllTripQuery,
  cancelAtripQuery, checkIfBusIsAvailableQuery, filterTripQuery,
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
      const {
        trip_id, bus_id, origin,
        destination, trip_date, fare, status,
      } = rows[0];

      const id = trip_id;
      return res.status(201).json({
        status: 'success',
        data: {
          id,
          bus_id,
          origin,
          destination,
          trip_date,
          fare,
          status,
        },
      });
    } catch (errors) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }

  /**
   * Admin and user can get all trip
 *@param {req} object
 *@param {res} object
 */
  static async getAllTrips(req, res) {
    try {
      const { rows } = await db.query(getAllTripQuery);
      if (rows.length <= 0) {
        return res.status(404).json({
          status: 'error',
          error: 'No trips found',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Something went wrong, try again',
      });
    }
  }

  /**
       * Admin can cancel a trip
       * @param {*} req
       * @param {*} res
       */
  static async cancelATrip(req, res) {
    // check for admin user
    if (!req.user.is_admin) {
      return res.status(403).json({
        error: 'Unauthorized!, Admin only route',
      });
    }
    const { error } = CheckForValidInput.checkParams(req.params);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    try {
      const values = [
        'canceled',
        new Date(),
        req.params.trip_id,
      ];

      const { rows } = await db.query(cancelAtripQuery, values);
      if (rows.length <= 0) {
        return res.status(404).json({
          status: 'error',
          error: 'No trip found with such ID',
        });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Trip cancelled successfully',
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        error: 'Something went wrong, try again',
      });
    }
  }


  /**
   * user can filter trip destination or origin
 *@param {req} object
 *@param {res} object
 */
  static async getTripByDestOrOrigin(req, res, next) {
    const { error } = CheckForValidInput.checkTripParams(req.query);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const { destination, origin } = req.query;
    if (destination || origin) {
      try {
        const { rows } = await db.query(filterTripQuery, [destination, origin]);
        if (rows.length <= 0) {
          return res.status(404).json({
            status: 'error',
            error: 'Not Found',
          });
        }
        return res.status(200).json({
          status: 'success',
          data: rows,
        });
      } catch (errors) {
        return res.status(400).json({
          status: 'error',
          error: 'Something went wrong, try again',
        });
      }
    }
    return next();
  }
}

export default Trip;
