import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to the db');
});

const createTables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS
  users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR (128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    modified_on TIMESTAMP NOT NULL,
    is_admin BOOLEAN NOT NULL
   )`;
  pool.query(Users).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    pool.end();
  });

  const Bus = `CREATE TABLE IF NOT EXISTS
  bus (
    bus_id SERIAL PRIMARY KEY,
    number_plate VARCHAR(128) NOT NULL,
    manufacturer VARCHAR(128) NOT NULL,
    model VARCHAR(128) NOT NULL,
    year VARCHAR(128) NOT NULL,
    capacity INT NOT NULL,
    created_on TIMESTAMP NOT NULL
    )`;
  pool.query(Bus).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    pool.end();
  });
  const Trip = `CREATE TABLE IF NOT EXISTS
  trip (
    trip_id SERIAL PRIMARY KEY,
    bus_id SERIAL NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    trip_date TIMESTAMP NOT NULL,
    fare FLOAT(4) NOT NULL,
    status VARCHAR(128) NOT NULL,
    modified_on TIMESTAMP NOT NULL
    )`;
  pool.query(Trip).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    pool.end();
  });
  
};

pool.on('remove', () => {
  // eslint-disable-next-line no-console
  console.log('client removed');
  process.exit(0);
});


module.exports = createTables;

require('make-runnable');