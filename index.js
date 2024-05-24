require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* Set up EJS for templating */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));       // Middleware to parse POST data
app.use(express.static(path.join(__dirname, 'public')));  // Middleware to serve static files

/* Use the charge route for payment processing */
app.use('/charge', chargeRouter);


/* Route to display the main order form */
app.get('/', (req, res) => {
  const merchant = {
      name: "Example Store",
      mainColor: "#0000FF", 
      enableHostedPayments: true,
      products: [
          { name: "Product 1", description: "Description 1", price: 1200, imgUrl: "/images/product1.jpg" },
          { name: "Product 2", description: "Description 2", price: 1500, imgUrl: "/images/product2.jpg" }
      ],
      url: "http://example.com",
      urlDisplay: "example.com",
      header: "Welcome to Our Store",
      description: "Explore our products below."
  };
  res.render('index', { merchant });
});

/* Routes for form submissions */
app.post('/hosted-checkout', (req, res) => {
  // TODO: Logic for hosted checkout
  res.send("Hosted Checkout Page");
});

app.post('/checkout', (req, res) => {
  // TODO: Logic for direct checkout
  res.send("Direct Checkout Page");
});

/* Routes for process payment */
app.post('/process-payment', async (req, res) => {
    const { simplifyToken, customerName, customerEmail, address, city, state, zip } = req.body;
    // ###SAMPLE TEST###: Assume total amount & order details is stored in session
    const totalAmount = req.session.totalAmount; 
    const orders = req.session.orders; 

    try {
        // TODO: Simplify API initialization and payment creation logic 
        // ###SAMPLE TEST###: Assume the payment goes through and return a successful response

        // Render the response page
        res.render('paymentResponse', {
            paymentStatus: 'APPROVED',
            paymentId: '123456', // Mock payment ID
            orders,
            totalAmount,
            customerName,
            address,
            city,
            state,
            zip,
            merchantEmail: 'support@example.com',   // Merchant contact email
            merchantUrl: 'http://example.com',      // Merchant URL
            merchantUrlDisplay: 'example.com'       // Display version of the URL
        });

    } catch (error) {
        console.log(error);
        res.render('paymentResponse', {
            paymentStatus: 'DECLINED',
            merchantEmail: 'support@example.com'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




/** OLD CODE - KEEP UNTIL CONFIRM DISCARD */
// const express = require('express');
// const app = express();

// // Serve static files
// app.use(express.static('public'));

// // Root route serves the HTML page
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });