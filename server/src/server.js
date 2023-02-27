require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//Require routes
const routerCategories = require('./routes/categoty.routes')
const routerProduct = require('./routes/product.routes')
const routerUsers = require('./routes/users.routes')
const routerColor = require('./routes/color.routes')
const checkoutRouter = require('./routes/mpago.routes')
const routerCart = require('./routes/productsInCart.routes')

//Settings
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/category', routerCategories);
app.use('/products', routerProduct);
app.use('/users', routerUsers);
app.use('/colors', routerColor);
app.use('/mpago', checkoutRouter);
app.use('/cart',routerCart);

app.use((req, res, next) => {
    res.status(404).json({
        status: '404',
        description: 'page not found'
    })
});

module.exports = app;