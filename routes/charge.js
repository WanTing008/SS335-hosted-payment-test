const express = require('express');
const router = express.Router();
const Simplify = require('simplify-commerce');

const client = Simplify.getClient({
    publicKey: process.env.SIMPLIFY_API_PUBLIC_KEY,
    privateKey: process.env.SIMPLIFY_API_PRIVATE_KEY
});

router.post('/', (req, res) => { 
    const { simplifyToken, amount, currency = 'AUD' } = req.body;

    client.payment.create({
        amount: amount,
        token: simplifyToken,
        description: 'Test payment',
        currency: currency
    }, (err, data) => {
        if (err) {
            console.error('Error creating payment:', err);
            return res.status(500).json({
                error: err.message,
                reference: err.reference,
                fieldErrors: err.fieldErrors || [],
                errorCode: err.code
            });
        }

        const response = {
            id: data.payment.id,
            status: data.paymentStatus
        };
        res.json(response);
    });
});

module.exports = router;