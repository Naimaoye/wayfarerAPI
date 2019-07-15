import Db from './Db';

const dropTables = () =>{ 
    const query = 'DROP TABLE IF EXISTS users, bus, trip, bookings  CASCADE';
    Db.query(query);
};


export default dropTables;

require('make-runnable');