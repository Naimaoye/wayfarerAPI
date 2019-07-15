const bookTripQuery = `INSERT INTO 
bookings (user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      returning booking_id, user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email`;












      export {
        bookTripQuery,
      };