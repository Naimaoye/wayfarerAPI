import jwt from 'jsonwebtoken';
import Db from '../migrations/Db';

class Authentication {
    
    static generateToken(user_id, email, is_admin) {
       const token = jwt.sign(
           {
               user_id,
               email,
               is_admin,
           },
           process.env.SECRET_KEY,
           {
               expiresIn: '12h',
           },
       );
       
       return token;
    }

    static async verifyToken(req, res, next) {
        const { token } = req.headers;
        // check if token is provided
        if (!token) {
            return res.status(403).json({
                status: 403,
                error: 'Unauthorized!, you need to login',
            });
        }
        try {
            //verify user provided token against existing token
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);

            const queryString = 'SELECT * FROM users WHERE user_id = $1';
            const { rows } = await Db.query(queryString, [decoded.user_id]);

            //check for valid app users
            if (!rows[0]) {
               return res.status(401).json({
                   status: 401,
                   error: 'The token you provide is invalid'
               });
            }
            req.user = decoded;
            return next();
        }
        catch(errors) {
            if (errors.name === 'TokenExpiredError') {
                return res.status(409).json({
                    status: 'error',
                    error: 'Token Expired, please login again'
                });
            };
            return res.status(400).json({
                status: 400,
                error: 'something went wrong, retry!'
            });
        };
    }
}

export default Authentication;