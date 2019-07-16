const createUserQuery = `INSERT INTO 
users(email, first_name, last_name, password, is_admin, created_on, modified_on) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      returning user_id, email, first_name, last_name, is_admin, created_on, modified_on`;

const loginUserQuery = 'SELECT * FROM users WHERE email = $1';

export {
  createUserQuery,
  loginUserQuery,
};