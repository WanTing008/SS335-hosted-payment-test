require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/payments', paymentRoutes);  

app.get('/', (req, res) => {
  res.send('TESTING! Hello from Simplify Integration Server!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});