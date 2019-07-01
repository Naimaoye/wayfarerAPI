import express from 'express';



const app = express();

app.get('/', (req, res) => {
    res.send('ci with travis');
  });
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default app;