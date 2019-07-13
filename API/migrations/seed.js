import Authenticator from '../middleware/Authentication';
import query from './Db';

const insertIntoTables = `
  INSERT INTO users ("first_name", "last_name", address, email, password, created_on, modified_on, "is_admin")
  VALUES ('Odun', 'Ayo', 'hogwarts', 'odun@mail.com', '${Authenticator.hashPassword('pasSword2')}', new Date(), new Date() ,false),
         ('Jane', 'Doe', 'hogwarts', 'janedoe@mail.com', '${Authenticator.hashPassword('pasSword2')}', new Date(), new Date(), false),
         ('Patrick', 'Doe', 'hogwarts', 'patrickdoe@mail.com', '${Authenticator.hashPassword('pasSword2')}', new Date(), new Date(), false),
         ('John', 'Doe', 'hogwarts', 'johndoe@wayfarer.com', '${Authenticator.hashPassword('pasSword2')}', new Date(), new Date(), true);

 
  INSERT INTO trip (created_on, origin, destination, trip_date, fare, status, modified_on)
  VALUES (new Date(),'Sango-ota', 'Lekki', new Date(), 1400, 'active', new Date()),
         (new Date(),'ikeja', 'Aja', new Date(), 1400, 'active', new Date());

 INSERT INTO bus (number_plate, manufacturer, model, year, capacity, created_on)
  VALUES (LG10435, 'Toyota', '2018M' '2016' 150, new Date()),
         (LG10435, 'Toyota', '2018M' '2016' 180, new Date());

INSERT INTO bookings (user_id, trip_id, created_on, bus_id, trip_date, seat_number, "first_name", "last_name", email)
    VALUES (1, '1023', new Date(), 1024, new Date(), 12, 'Odun', 'Ayo', 'odun@mail.com'),
           (1, '1025', new Date(), 1056, new Date(), 18, 'Jane', 'Doe', 'jane@mail.com');        
`;
query(insertIntoTables);
