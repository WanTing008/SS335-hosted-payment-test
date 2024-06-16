# CommBank Simplify Hosted Payment Gateway
Commbank Simplify Hosted Payment Test for J&K Labs. 
This implementation is still a prototype work in progress, payment form can only be run locally on `localhost`. 

## Run Instructions (Local)
1. Run `npm install express dotenv request body-parser` to install the necessary JavaScript node modules to run the local payment form.
2. Run `npm install shopify-node-api  simplify-commerce` to install the necessary dependencies for Shopify and Simplify Commerce.
3. To run a local payment form on http://localhost:3000, run `node index.js` from your terminal.

## Disclaimer
- For security reasons, API keys for Shopify and CommBank Simplify is fitted with a placeholder. 
- Real-time implementations does not work yet due to issues with deployment.
- Only local testing for error validation is possible. 

### References:
- https://github.com/Mastercard-Gateway/simplify-php-server/tree/master
- https://commbank.simplify.com/commerce/docs/tools/hosted-payments
- https://shopify.dev/docs/apps/launch/deployment/deploy-web-app
