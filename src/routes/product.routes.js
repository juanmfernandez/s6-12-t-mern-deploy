const Router = require('express');

const { 
    productList, 
    productDetail, 
    saveProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/product.controller")

const protectRouters = require('../middlewares/protect.middleware')
const { checkSchema } = require("express-validator");
const { productSchema } = require("../schemas/product.schema");
const { handleValidator } = require('../helpers/validatorHandler');
const { checkMultipart, handleUploadFirebase } = require("../middlewares/upload.middleware")

const routerProduct = Router()

routerProduct.get('/', productList)

routerProduct.get('/:id', productDetail);

routerProduct.use(protectRouters);

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