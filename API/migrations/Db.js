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
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}



// pool.on('remove', () => {
//     // eslint-disable-next-line no-console
//     console.log('client removed');
//   });

export default Db;