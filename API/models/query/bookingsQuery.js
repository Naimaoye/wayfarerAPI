const bookTripQuery = `INSERT INTO 
bookings (user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      returning booking_id, user_id, trip_id, created_on, bus_id, trip_date, seat_number, first_name, last_name, email`;
      const getAtripQuery = 'SELECT * FROM trip WHERE trip_id = $1';

      const getAllBookingsAdminQuery = 'SELECT * FROM bookings';
      
      const getAllBookingsUserQuery = 'SELECT * FROM bookings WHERE email = $1';
      
      const findAuserQuery = 'SELECT * FROM users WHERE user_id = $1';
      
      const findAbusQuery = 'SELECT * FROM bus WHERE bus_id = $1';
      
      const checkBookingsQuery = 'SELECT * FROM bookings WHERE (trip_id = $1 and seat_number = $2)';
      
      const checkIfBookingExistQuery = 'SELECT * FROM bookings WHERE (trip_id = $1 and user_id = $2)';
      
      const deleteBookingQuery = 'DELETE FROM bookings WHERE (booking_id = $1 and user_id = $2) returning *';
      
      const updateBookingQuery = 'UPDATE bookings SET seat_number = $1 WHERE (email = $2 AND user_id = $3 AND booking_id = $4) returning *';



      
      export {
        bookTripQuery,
        getAtripQuery,
        getAllBookingsAdminQuery,
        getAllBookingsUserQuery,
        findAuserQuery,
        findAbusQuery,
        checkBookingsQuery,
        checkIfBookingExistQuery,
        deleteBookingQuery,
        updateBookingQuery,
      };