require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//Require routes
const routerBrands = require('./routes/brands.routes')
const routerCategories = require('./routes/categoty.routes')
const routerProduct = require('./routes/product.routes')
const routerUsers = require('./routes/users.routes')
const routerColor = require('./routes/color.routes')
const checkoutRouter = require('./routes/mpago.routes')
const routerCart = require('./routes/productsInCart.routes')
const routerSize = require('./routes/size.routes')


//Settings
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/category', routerCategories);
app.use('/brands', routerBrands);
app.use('/products', routerProduct);
app.use('/users', routerUsers);
app.use('/colors', routerColor);
app.use('/mpago', checkoutRouter);
app.use('/cart',routerCart);
app.use('/size',routerSize);

app.use((req, res, next) => {
    res.status(200).json({
        status: '200',
        description: 'Welcome to A-Tempo API'
    })
});

module.exports = app;