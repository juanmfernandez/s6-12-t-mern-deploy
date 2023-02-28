const Router = require('express');

const { 
    productList, 
    productDetail, 
    saveProduct, 
    updateProduct, 
    deleteProduct, 
} = require("../controllers/product.controller")

const protectRouters = require('../middlewares/protect.middleware')
const { checkSchema } = require("express-validator");
const { productSchema } = require("../schemas/product.schema");
const { handleValidator } = require('../helpers/validatorHandler');
const { checkMultipart, handleUploadFirebase } = require("../middlewares/upload.middleware");
const { addReview } = require('../controllers/reviews.controller');
const { ownership } = require("../middlewares/ownership");
const { addFavorites, delFavorites } = require('../controllers/favorites.controller');

const routerProduct = Router()

routerProduct.get('/', productList)

routerProduct.get('/:id', productDetail);

routerProduct.use(protectRouters);

routerProduct.post('/:prodId/user/:usId', addFavorites)

routerProduct.post('/review/:prodId/user/:id', ownership, addReview)

routerProduct.delete('/:prodId/user/:usId', delFavorites)

routerProduct.post('/save', 
    checkMultipart, 
    handleUploadFirebase, 
    checkSchema(productSchema), 
    handleValidator, 
    saveProduct
);

routerProduct.put('/update/:id', 
    checkSchema(productSchema), 
    handleValidator, 
    updateProduct
);

routerProduct.delete('/delete/:id', deleteProduct);

module.exports = routerProduct;