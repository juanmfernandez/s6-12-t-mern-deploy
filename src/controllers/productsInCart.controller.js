const { Product, User, Cart, Color, Size, ProductsInCart } = require('../database/models');
const { validateToken } = require("../helpers/jwtHandler");

//* Verify that user's token contains a Cart and return his id
const getTokenCartId = (req) => {
    let token, tokenCartId;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    const decodedToken = validateToken(token);
    if (!decodedToken.user.Cart) {
        throw new Error(`User does not have a cart`)
    }
    return tokenCartId = decodedToken.user.Cart.id;
}

//* Add product to cart
const addToCart = async (req, res) => {

    const { idProduct, quantity, size, color, last } = req.body;

    try {
        let tokenCartId = getTokenCartId(req);

        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(tokenCartId));

        if (!product || !cart) {
            let msg = !cart ? `Cart ${tokenCartId}` : `Product ${idProduct}`
            throw new Error(`${msg} not found`)
        }

        if (product.quantityInStock > 0 && product.quantityInStock >= quantity) {
            const productAdded = await ProductsInCart.create({
                ProductId: idProduct,
                CartId: tokenCartId,
                quantity,
                size,
                color,
                last
            });

            await cart.increment({ totalPrice: (product.dataValues.price * quantity) });
            res.status(200).json({ message: "Added succesfully.", productAdded });
        } else {
            res
                .status(400)
                .json({ message: "Cannot add to cart, out of stock." });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//* Remove product from cart
const remToCart = async (req, res) => {
    const { idProduct, idCart } = req.query;
    if (!idProduct || !idCart) {
        return res.status(400).json({ error: "Both 'idProduct' and 'idCart' parameters are required." });
    }
    try {
        let tokenCartId = getTokenCartId(req);
        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(tokenCartId));
        await cart.decrement({ totalPrice: product.price });
        const productRem = await cart.removeProducts(product);
        res.status(200).json(productRem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//* Get cart with products
const getCart = async (req, res) => {
    const { idCart } = req.query;
    if (!idCart) {
        return res.status(400).json({ error: "The 'idCart' parameter is required." });
    }
    try {
        let tokenCartId = getTokenCartId(req);

        const cart = await Cart.findByPk(tokenCartId, {
            include: {
                model: Product,
                attributes: ["id", "name", "description", "price", "quantityInStock", "createdAt"],
                include: [
                    {
                        association: "ProductImgs",
                        attributes: ["id", "imgUrl"],
                    },
                    {
                        association: "Brand",
                        attributes: ["id", "name", "imgBrand"],
                    },
                ],
            },
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//* Empty cart
const deleteCart = async (req, res) => {
    const { idCart } = req.query;
    if (!idCart) {
        return res.status(400).json({ error: "The 'idCart' parameter is required." });
    }

    try {
        let tokenCartId = getTokenCartId(req);
        const cart = await Cart.findByPk(parseInt(tokenCartId), { include: Product });
        await cart.removeProducts(cart.dataValues.Products);
        await Cart.update({ totalPrice: 0 }, { where: { id: parseInt(tokenCartId) } });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getCart, addToCart, remToCart, deleteCart }