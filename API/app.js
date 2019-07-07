import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to wayfarerAPI endpoints, created by Oyewale Naimat'
}));


// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

// handles 500 error
app.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(500).json({
    status: 500,
    error: 'OOps! Looks like something broke',
  });
});
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default app;