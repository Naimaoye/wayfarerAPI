import Helper from '../helper/Helper';
const users = [
{
    email : 'johndoe@wayfarer.com',
    first_name : 'john',
    last_name : 'doe',
    address : 'ibidun estate lekki',
    password : Helper.hashPassword('password'),
    is_admin : true,
    created_on : new Date(),
    modified_on : new Date()
},
{
    email : 'doyin@gmail.com',
    first_name : 'doyin',
    last_name : 'naimat',
    address : 'idrees oyewale crescent oke-gada ede',
    password : Helper.hashPassword('password'),
    is_admin : false,
    created_on : new Date(),
    modified_on : new Date()  
}
];

const bus = [
    {
       number_plate: 'ABJ32-456',
       manufacturer: 'Toyota',
       model: 'Hiace',
       year: '2018',
       capacity: 36,
       created_on: new Date()
    },
    {
        number_plate: 'LAG25-6336',
        manufacturer: 'Suzuki',
        model: 'Fortnight',
        year: '2016',
        capacity: 40,
        created_on: new Date()
    }
];

const trip = [
    {
        bus_id: 1,
        created_on: new Date(),
        origin : 'oyo', 
        destination: 'katsina', 
        trip_date: new Date("July 20, 2019 11:13:00"), 
        fare: 2010.033, 
        status: 'active',
        modified_on: new Date()
    },
    {
        bus_id: 2,
        created_on: new Date(),
        origin : 'lagos', 
        destination: 'abuja', 
        trip_date: new Date("July 28, 2019 11:13:00"),
        fare: 200.033, 
        status: 'active',
        modified_on: new Date()
       }
 ]
export {
    users,
    bus,
    trip
};