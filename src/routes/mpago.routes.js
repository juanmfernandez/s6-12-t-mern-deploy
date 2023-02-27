const Router = require('express');
const { createCheckout, handlePayment } = require("../controllers/mpago.controller");

const checkoutRouter = Router();

checkoutRouter.get('/process', createCheckout);
checkoutRouter.get('/success', handlePayment);
checkoutRouter.get('/failure', handlePayment);
checkoutRouter.get('/pending', handlePayment);

module.exports = checkoutRouter;