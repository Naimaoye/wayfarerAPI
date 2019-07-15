const createTripQuery = `INSERT INTO 
trip (bus_id, created_on, origin, destination, trip_date, fare, status, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      returning trip_id, bus_id, origin, destination, trip_date, fare, status`;

const createBusQuery = `INSERT INTO 
bus (number_plate, manufacturer, model, year, capacity, created_on) 
      VALUES($1, $2, $3, $4, $5, $6) 
      returning *`;

const getAllTripQuery = 'SELECT * FROM trip';

const cancelAtripQuery = `UPDATE trip
      SET status=$1, modified_on=$2
      WHERE trip_id=$3 returning *`;


const checkIfBusIsAvailableQuery = 'SELECT * FROM trip WHERE (trip_date = $1 AND bus_id = $2 AND status = $3)';

const filterTripQuery = 'SELECT * FROM trip WHERE (destination = $1 OR origin = $2)';

export {
    createTripQuery,
    createBusQuery,
    getAllTripQuery,
    cancelAtripQuery,
    checkIfBusIsAvailableQuery,
    filterTripQuery
};