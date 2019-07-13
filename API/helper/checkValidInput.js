import Joi from 'joi';

class CheckForValidInput {
  /**
   * funtion to check if user input valid details during registration
   * @param {user} object
   */
  static createUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim().required()
        .error(() => 'Valid email field is required'),
      first_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'First name field is required with min length of 3 and must be alphabet'),
      last_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'last name field is required with min length of 3 and must be alphabet'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).trim().strict()
        .required()
        .error(() => 'Password field is required with mininum 6 characters'),
      address: Joi.string().trim().strict().min(25)
        .required()
        .error(() => 'Address field is required and should not be less than 25 characters'),
    });
    return Joi.validate(user, schema);
  }

  /**  funtion to validate login inputs
     * @param{details} string
     */
  static loginAuser(details) {
    const schema = Joi.object().keys({
      email: Joi.string().email().trim()
        .required()
        .error(() => 'Email is required'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().strict()
        .required()
        .error(() => 'you must provide a correct password'),
    });
    return Joi.validate(details, schema);
  }


  /**
   * funtion to check if trip input are valid
   * @param {trip} object
   */
  static createAtrip(trip) {
    const schema = Joi.object().keys({
      bus_id: Joi.number().integer().min(1)
        .required()
        .error(() => 'bus id is required and should be an integer number'),
      origin: Joi.string().trim().strict().regex(/^[a-z]+$/)
        .min(3)
        .required()
        .error(() => 'origin is required and should not be less than 3 characters and must be lowercase'),
      destination: Joi.string().trim().strict().regex(/^[a-z]+$/)
        .min(3)
        .required()
        .error(() => 'destination is required and should not be less than 3 characters and must be lowercase'),
      trip_date: Joi.date().required()
        .error(() => 'trip date is required'),
      fare: Joi.number().min(1)
        .required()
        .error(() => 'fare is required and can not be less than $1'),
    });
    return Joi.validate(trip, schema);
  }


  /**
   * funtion to add bus database for trips
   * @param {bus} object
   */
  static addBusForTrip(bus) {
    const schema = Joi.object().keys({
      number_plate: Joi.string().trim().strict().regex(/B[a-zA-Z]{3}-\d{3}/)
        .required()
        .error(() => 'Number plate is required and must be correct plate-number format'),
      manufacturer: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'bus manufacturer is required'),
      year: Joi.string().trim().strict().regex(/^[0-9]*$/)
        .min(4)
        .required()
        .error(() => 'Correct year format is required'),
      capacity: Joi.number().integer().min(4)
        .required()
        .error(() => 'Bus capacity is required'),
      model: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'bus model is required'),
    });
    return Joi.validate(bus, schema);
  }

  /**
   * funtion to check valid trip id
   * @param {trip_id} object
   */
  static checkParams(trip_id) {
    const schema = Joi.object().keys({
      trip_id: Joi.number().integer()
        .required()
        .error(() => 'Params must be integer!'),
    });
    return Joi.validate(trip_id, schema);
  }

  /**
   * funtion to check valid booking_id
   * @param {booking_id} object
   */
  static checkBookParams(booking_id) {
    const schema = Joi.object().keys({
      booking_id: Joi.number().integer()
        .required()
        .error(() => 'Params must be integer!'),
    });
    return Joi.validate(booking_id, schema);
  }

  /**
   * funtion to check valid booking inputs
   * @param {trip_id} object
   */
  static checkBooking(trip_id) {
    const schema = Joi.object().keys({
      trip_id: Joi.number().integer()
        .required()
        .error(() => 'Trip ID must be an Integer number!'),
      seat_number: Joi.number().integer()
        .required()
        .error(() => 'Seat number must be an Integer number!'),
    });
    return Joi.validate(trip_id, schema);
  }

  /**
   * funtion to check valid params strings to
   * filter trip by users
   * @param {filterTrip} object
   */
  static checkTripParams(filterTrip) {
    const schema = Joi.object().keys({
      destination: Joi.string().trim().strict().lowercase()
        .error(() => 'Enter a valid lowercase string value'),
      origin: Joi.string().trim().strict().lowercase()
        .error(() => 'Enter a valid lowercase string value'),
    });
    return Joi.validate(filterTrip, schema);
  }
}

export default CheckForValidInput;
