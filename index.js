require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chargeRouter = require('./routes/charge');            // Import the charge module
const shopifyAPI = require('shopify-node-api');             // Import Shopify API library

const app = express();

/* Set up EJS for templating */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());                                 // Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));         // Middleware to parse POST data
app.use(express.static(path.join(__dirname, 'public')));    // Middleware to serve static files

/* Use the charge route for payment processing */
app.use('/charge', chargeRouter);

/* Shopify API setup */
const Shopify = new shopifyAPI({
    shop: process.env.SHOPIFY_SHOP_NAME,
    shopify_api_key: process.env.SHOPIFY_API_KEY,
    access_token: process.env.SHOPIFY_ACCESS_TOKEN
});

/* Root route for simulated test */
app.get('/', (req, res) => {
    res.redirect('/payment?amount=100&orderId=30001');      // Redirect to the payment form with test data
});

/* Route to render the payment form with order details */
app.get('/payment', (req, res) => {
    const { amount, orderId } = req.query;
    res.render('paymentForm', { amount, orderId });
});

/* Route to handle payment success */
app.get('/payment-success', async (req, res) => {
    const { orderId } = req.query;

    // Update order status in Shopify
    Shopify.put(`/admin/orders/${orderId}.json`, {
        order: {
            id: orderId,
            note: "Payment processed via CommBank Simplify",
            financial_status: "paid"
        }
    }, (err, data, headers) => {
        if (err) {
            console.error(err);
            return res.redirect('/payment-fail');
        }
        res.render('orderConfirmation', { orderId });
    });
});

/* Route to handle payment failure */
app.get('/payment-fail', (req, res) => {
    res.send('Payment failed. Please try again.');
});

/* Route to process payment */
app.post('/process-payment', async (req, res) => {
    const { simplifyToken, amount, orderId } = req.body;

    try {
        const payment = await client.payment.create({
            amount: amount * 100, // Amount in cents
            token: simplifyToken,
            description: `Order #${orderId}`,
            currency: 'AUD'
        });

        if (payment.paymentStatus === 'APPROVED') {
            // Redirect to payment success page
            res.redirect(`/payment-success?orderId=${orderId}`);
        } else {
            // Redirect to payment failure page
            res.redirect(`/payment-fail?orderId=${orderId}`);
        }
    } catch (error) {
        console.error('Payment processing error:', error);
        res.redirect(`/payment-fail?orderId=${orderId}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});