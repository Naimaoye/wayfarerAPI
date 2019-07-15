
import Db from './Db';
import { createUserQuery } from '../models/query/userQuery';
import { createBusQuery, createTripQuery } from '../models/query/tripQuery';
import {users, bus, trip} from './seedData';

 const seedData = () => {
users.forEach( async (user)=>{
  console.log("user", user);
  const { email, first_name, last_name, address, password, is_admin, created_on, modified_on} = user;
  const values = [
    email, first_name, last_name, address, password, is_admin, created_on, modified_on
  ]
  console.log(values)
  await Db.query(createUserQuery, values);
});

bus.forEach( async (busIndex)=>{
  console.log("busIndex", busIndex);
  const { number_plate, manufacturer, model, year, capacity, created_on } = busIndex;
  const values = [
    number_plate, manufacturer, model, year, capacity, created_on 
  ]
  console.log(values);
  await Db.query(createBusQuery, values);
});

trip.forEach( async (tripIndex)=>{
  console.log("tripIndex", tripIndex);
  const { bus_id, created_on, origin, destination, trip_date, fare, status, modified_on } = tripIndex;
  const values = [
    bus_id, created_on, origin, destination, trip_date, fare, status, modified_on
  ]
  console.log(values);
  await Db.query(createTripQuery, values);
});


};



export default seedData;

require('make-runnable');
