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

export default users;