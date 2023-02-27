// Router
const Router = require('express');
const cartRouter = Router();

// Controllers
const {getCart, addToCart, remToCart, deleteCart} = require('../controllers/productsInCart.controller');

// Routes
cartRouter.get('/',getCart);
cartRouter.post('/add',addToCart);
cartRouter.post('/remove',remToCart);
cartRouter.delete('/delete',deleteCart);

module.exports = cartRouter;