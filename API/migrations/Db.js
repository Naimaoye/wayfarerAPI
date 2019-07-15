import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let connectionString;

if (process.env.NODE_ENV === 'test') {
    connectionString = process.env.TEST_DATABASE_URL;
}
else{
    connectionString = process.env.DATABASE_URL;
}
// Instantiate pool
const pool = new Pool({
    connectionString,
});

class Db {

    static async query(queryString, params) {
        return new Promise((resolve, reject) => {
            pool
            .query(queryString, params)
            .then((res) => {
                resolve(res);
                pool.end();
            })
            .catch((err) => {
                reject(err);
                pool.end();
            });
        });
    }
}



pool.on('remove', () => {
    // eslint-disable-next-line no-console
    console.log('client removed');
    process.exit(0);
  });

export default Db;