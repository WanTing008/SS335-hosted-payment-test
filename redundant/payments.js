const express = require('express');
const router = express.Router();
const { redirectToPayment, handleCallback } = require('../controllers/paymentController');

router.get('/pay', redirectToPayment);  // Route to initiate payment
router.get('/callback', handleCallback);  // Route to handle callback from payment gateway

module.exports = router;