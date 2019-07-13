import query from '../migrations/Db';

const dropTables = 'DROP TABLE IF EXISTS users, bus, trip, bookings  CASCADE';

query(dropTables);
