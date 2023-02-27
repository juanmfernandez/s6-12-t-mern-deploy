const {Product,User,Cart,Color,Size} = require('../database/models');

//* Add product to cart
const addToCart = async (req,res) => {
    const {idProduct, idCart} = req.query;
    if (!idProduct || !idCart) {
        return res.status(400).json({ error: "Both 'idProduct' and 'idCart' parameters are required." });
    }
    try {
        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(idCart));
        if (product.quantityInStock > 0) {
            const productAdd = await cart.addProducts(product);
            await cart.increment({ totalPrice: product.dataValues.price });
            res.status(200).json(productAdd);
          } else {
            res
                .status(400)
                .json({ message: "Cannot add to cart, out of stock." });
          }
    } catch (error) {
        res.status(400).json(error);
    }
}

//* Remove product from cart
const remToCart = async (req,res) => { 
    const {idProduct, idCart} = req.query;
    if (!idProduct || !idCart) {
        return res.status(400).json({ error: "Both 'idProduct' and 'idCart' parameters are required." });
    }
    try {
        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(idCart));
        await cart.decrement({ totalPrice: product.price });
        const productRem = await cart.removeProducts(product);
        res.status(200).json(productRem);
    } catch (error) {
        res.status(400).json(error);
    }
}

//* Get cart with products
const getCart = async (req,res) => {
    const {idCart} = req.query;
    if (!idCart) {
        return res.status(400).json({error: "The 'idCart' parameter is required."});
    }
    try {
        const cart = await Cart.findByPk(idCart, {
            include: {
                model: Product,
                include: [
                    { association: "ProductImgs" },
                    { association: "Size" },
                    { association: "Categories" },
                    { association: "Colours" },
                    { association: "Brand" },
                    { association: "Last" },
                ]
            },
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

//* Empty cart
const deleteCart = async (req,res) => {
    const {idCart} = req.query;
    if (!idCart) {
        return res.status(400).json({error: "The 'idCart' parameter is required."});
    }
    try {
        const cart = await Cart.findByPk(parseInt(idCart),{ include: Product });
        await cart.removeProducts(cart.dataValues.Products);
        await Cart.update({ totalPrice: 0 }, { where: { id: parseInt(idCart) } });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getCart, addToCart, remToCart, deleteCart }