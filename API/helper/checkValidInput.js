import Joi from 'joi';

const validationOptions = {
     allowUnknown: true, // allow unknown keys that will be ignored
     stripUnknown: true, // remove unknown keys from the validated data
 };

class CheckForValidInput {
  /**
   * funtion to check if user input valid details during registration
   * @param {user} object
   */
  static createUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string().trim().strict().email()
        .required()
        .error(() => 'Valid email field is required'),
      first_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'First name field is required with min length of 3 and must be alphabet'),
      last_name: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'last name field is required with min length of 3 and must be alphabet'),
      password: Joi.string().trim().strict()
        .min(6)
        .required()
        .error(() => 'Password field is required with mininum 6 characters'),
      address: Joi.string().trim()
        .required()
        .error(() => 'last name field is required with min length of 3 and must be alphabet'),  
    });
    return Joi.validate(user, schema, validationOptions);
  }

  /**  funtion to validate login inputs
     * @param{details} string
     */
  static loginAuser(details) {
    const schema = Joi.object().keys({
      email: Joi.string().trim().strict().email()
        .required()
        .error(() => 'Email is required'),
      password: Joi.string().trim().strict().required()
        .error(() => 'you must provide a correct password'),
    });
    return Joi.validate(details, schema, validationOptions);
  }


  /**
   * funtion to check if trip input are valid
   * @param {trip} object
   */
  static createAtrip(trip) {
    const schema = Joi.object().keys({
      bus_id: Joi.number().integer()
        .error(() => 'bus id is required and should be an integer number'),
      origin: Joi.string().trim()
          .required()
          .error(() => 'origin is required and should not be less than 3 characters and must be lowercase'),
      destination: Joi.string().trim()
        .required()
        .error(() => 'destination is required and should not be less than 3 characters and must be lowercase'),
      trip_date: Joi.string()
        .required()
        .error(() => 'trip date is required'),
      fare: Joi.number()
        .required()
        .error(() => 'fare is required and can not be less than $1'),
    });
    return Joi.validate(trip, schema, validationOptions);
  }


  /**
   * funtion to add bus database for trips
   * @param {bus} object
   */
  static addBusForTrip(bus) {
    const schema = Joi.object().keys({
      number_plate: Joi.string().trim().strict().regex(/^[A-Za-z]{3}-[0-9]{3}-[A-Za-z]{2}$/)
        .required()
        .error(() => 'Number plate is required with this Nig format xxx-xxx-xx'),
      manufacturer: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .min(3)
        .required()
        .error(() => 'bus manufacturer is required'),
      year: Joi.string().trim().strict()
        .required()
        .error(() => 'Correct year format is required'),
      capacity: Joi.number().integer()
        .required()
        .error(() => 'Bus capacity is required'),
      model: Joi.string().trim().strict()
        .required()
        .error(() => 'bus model is required'),
    });
    return Joi.validate(bus, schema, validationOptions);
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
    return Joi.validate(trip_id, schema, validationOptions);
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
    return Joi.validate(booking_id, schema, validationOptions);
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
        .error(() => 'Seat number must be an Integer number!'),
    });
    return Joi.validate(trip_id, schema, validationOptions);
  }

  /**
   * funtion to check valid params strings to
   * filter trip by users
   * @param {filterTrip} object
   */
  static checkTripParams(filterTrip) {
    const schema = Joi.object().keys({
      destination: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .error(() => 'Enter a valid lowercase string value'),
      origin: Joi.string().trim().strict().regex(/^[a-zA-Z]+$/)
        .error(() => 'Enter a valid lowercase string value'),
    });
    return Joi.validate(filterTrip, schema, validationOptions);
  }
}

export default CheckForValidInput;
