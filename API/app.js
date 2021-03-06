import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import user from './routes/user';
import trip from './routes/trip';
import bookings from './routes/bookings';


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API routes
app.use('/api/v1/auth', user);
app.use('/api/v1', trip);
app.use('/api/v1', bookings);
//home page route
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to wayfarerAPI endpoints, created by Oyewale Naimat'
}));


// Handle non existing routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Wrong request. Route does not exist',
  });
});

// handles 500 error
app.use((err, req, res, next) => {
  if (err) {
  return res.status(500).json({
    status: 500,
    error: 'OOps! Looks like something broke',
  });
}
return next();
});
  
const port = process.env.PORT || 3014;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default app;