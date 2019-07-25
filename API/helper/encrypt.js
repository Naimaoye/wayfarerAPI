import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const Helper = {
  /**
       * Hash Password Method
       * @param {string} Password
       * @returns {string} returns hashed password
       */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  /**
       * compare Password
       * @param {string} hashPassword
       * @param {string} password
       * @returns {Boolean} return True or False
       */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
};

export default Helper;
