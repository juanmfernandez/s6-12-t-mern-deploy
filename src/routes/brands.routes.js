const Router = require('express');
const routerBrands = Router();

// Controllers
const { showAllBrands } = require('../controllers/brands.controller');

// Routes
routerBrands.get('/', showAllBrands);

module.exports = routerBrands;