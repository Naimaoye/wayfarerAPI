import db from '../migrations/Db';
import CheckForValidInput from '../helper/checkValidInput';
import Helper from '../helper/encrypt';
import Authentication from '../middleware/Authentication';
import { createUserQuery, loginUserQuery } from '../models/query/userQuery';


class User {
  /**
       * signup a user into the app
       * @param {*} req
       * @param {*} res
       */
  static async createUser(req, res) {
    const { error } = CheckForValidInput.createUser(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }
    const hashpassword = Helper.hashPassword(req.body.password);
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      hashpassword,
      false,
      new Date(),
      new Date(),
    ];
    try {
      const { rows } = await db.query(createUserQuery, values);
      const token = Authentication.generateToken(
        rows[0].user_id,
        rows[0].email,
        rows[0].is_admin,
      );

      return res.status(201).json({
        status: 'success',
        data: {
          token,
          user: rows,
        },
      });
    } catch (errors) {
      if (errors.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'email has been used',
        });
      }
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
       * log a user in to the app
       * @param {*} req
       * @param {*} res
       */
  static async loginUser(req, res) {
    const { error } = CheckForValidInput.loginAuser(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message,
      });
    }

    try {
      // Select all user record where email is equal db email
      const { rows } = await db.query(loginUserQuery, [req.body.email]);

      // check if user exist in database
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'email/password does not exist',
        });
      }

      const {
        user_id, email, first_name, last_name, address, is_admin, created_on,
      } = rows[0];

      // compare user provided password against db
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res
          .status(401)
          .json({
            status: 'error',
            error: 'Email/Password incorrect',
          });
      }

      // generate token
      const token = Authentication.generateToken(
        rows[0].user_id,
        rows[0].email,
        rows[0].is_admin,
      );

      // return success message
      return res.status(200).json({
        status: 'success',
        data: {
          user_id,
          email,
          first_name,
          last_name,
          address,
          is_admin,
          created_on,
          token,
        },
      });
    } catch (errors) {
      return res.status(500).json({
        status: 'error',
        error: 'internal server error',
      });
    }
  }
}

export default User;
