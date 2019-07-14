import Authenticator from '../middleware/Authentication';
import query from './Db';

const insertIntoTables = `
INSERT INTO
  users 
    VALUES 
    ( default, 'john', 'doe', 'ibidun estate lekki','johndoe@wayfarer.com','${Authenticator.hashPassword('pasSword2')}', NOW(), NOW(), ${true}),
    ( default, 'doyin', 'naimat', 'idrees oyewale crescent oke-gada ede','doyin@gmail.com','${Authenticator.hashPassword('pasSword2')}', NOW(), NOW(), ${false});
INSERT INTO
  bus
    VALUES 
    ( default, 'ABJ32-456', 'Toyota', 'Hiace', '2016', 18),
    ( default, 'LAG25-6336', 'Mercedes', 'Fortnight', '2018', 20),
    ( default, 'LAG25-6337', 'Mercedes', 'Fortnight', '2018', 1);
INSERT INTO
  trip
    VALUES 
    ( default, 1, 'Ogun', 'Oyo', NOW(), 2010.033, 'active', NOW()),
    ( default, 2, 'Ogoja', 'Calabar', NOW(), 123.00, 'cancelled', NOW()),
    ( default, 3, 'Ogoja', 'Calabar', NOW(),  123.00, 'active', NOW());
INSERT INTO
  bookings
    VALUES 
    ( default, 2, 1, 1, NOW(), 1, NOW(), 'Joey', 'King', 'jj06@gmail.com'),
    ( default, 1, 3, 3, NOW(), 1, NOW(), 'Mac', 'Okaba', 'markokaba99@gmail.com');
`;

query(insertIntoTables);
