const Router = require('express');
const { createCheckout, handlePayment } = require("../controllers/mpago.controller");
const protectRouters = require('../middlewares/protect.middleware')

const checkoutRouter = Router();

checkoutRouter.get('/process', protectRouters, createCheckout);
checkoutRouter.get('/success', protectRouters, handlePayment);
checkoutRouter.get('/failure', protectRouters, handlePayment);
checkoutRouter.get('/pending', protectRouters, handlePayment);

module.exports = checkoutRouter;