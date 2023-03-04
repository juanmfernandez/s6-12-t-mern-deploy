const { Product, User, Cart, Color, Size, ProductsInCart } = require('../database/models');
const { getTokenCartId } = require('../helpers/getTokenCart');

//* Add product to cart
const addToCart = async (req, res) => {

    const { ProductId, quantity, size, color, last } = req.body;
    try {
        let tokenCartId = getTokenCartId(req);

        const product = await Product.findByPk(parseInt(ProductId));
        const cart = await Cart.findByPk(parseInt(tokenCartId));

        if (!product || !cart) {
            let msg = !cart ? `Cart ${tokenCartId}` : `Product ${ProductId}`
            throw new Error(`${msg} not found`)
        }

        if (product.quantityInStock > 0 && product.quantityInStock >= quantity) {
            const productAdded = await ProductsInCart.create({
                ProductId,
                CartId: tokenCartId,
                quantity,
                size,
                color,
                last
            });

            await cart.increment({ totalPrice: (product.dataValues.price * quantity) });
            await product.decrement({ quantityInStock: quantity });
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
    const { idProduct, idCart, quantity } = req.query;
    if (!idProduct || !idCart) {
        return res.status(400).json({ error: "Both 'idProduct' and 'idCart' parameters are required." });
    }
    try {
        let tokenCartId = getTokenCartId(req);
        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(tokenCartId));

        const productRem = await cart.removeProducts(product);

        if (!productRem) {
            throw new Error(`Product not found in this cart`)
        }

        await cart.decrement({ totalPrice: (product.price * parseInt(quantity)) });

        const newTotalPrice = await Cart.findByPk(parseInt(tokenCartId), { attributes: ["totalPrice"] })

        res.status(200).json({
            message: `Product ${idProduct} removed succesfully.`,
            totalPrice: newTotalPrice.totalPrice,
            idProduct
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//* Modify quantity of a product in cart
const quantityHandler = async (req, res) => {
    const { quantity, modifier } = req.query;
    const { id } = req.params;

    if (!id || !modifier) {
        return res.status(400).json({ error: "Product id and modifier must be provided." });
    }

    try {
        let tokenCartId = getTokenCartId(req);
        const product = await Product.findByPk(parseInt(id));
        const cart = await Cart.findByPk(parseInt(tokenCartId));
        const itemToUpdate = await ProductsInCart.findOne({
            where: {
                ProductId: id,
                CartId: tokenCartId
            }
        })

        let msg, newQuantityToAdd, newQuantityToRem;

        if (parseInt(modifier) === 1) {

            newQuantityToAdd = (itemToUpdate.dataValues.quantity + parseInt(quantity))
            if (newQuantityToAdd > product.dataValues.quantityInStock) {
                throw new Error(`Not enough product stock`)
            }
            await itemToUpdate.update({ quantity: newQuantityToAdd });
            await cart.increment({ totalPrice: (product.dataValues.price * quantity) });
            msg = `${quantity} product ${id} added succesfully to cart.`;

        } else {

            newQuantityToRem = (itemToUpdate.dataValues.quantity - parseInt(quantity))
            if (newQuantityToRem < 1) {
                throw new Error(`There must be at least one product in the cart`)
            }
            await itemToUpdate.update({ quantity: newQuantityToRem });
            await cart.decrement({ totalPrice: (product.dataValues.price * quantity) });
            msg = `${quantity} product ${id} removed succesfully of cart.`;

        }

        const newTotalPrice = await Cart.findByPk(parseInt(tokenCartId), { attributes: ["totalPrice"] })

        res.status(200).json({
            message: msg,
            newQuantity: parseInt(modifier) === 1 ? newQuantityToAdd : newQuantityToRem,
            totalPrice: newTotalPrice.totalPrice,
            id
        });
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

module.exports = { getCart, addToCart, remToCart, deleteCart, quantityHandler }