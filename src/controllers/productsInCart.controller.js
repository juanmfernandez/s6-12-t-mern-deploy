const { Product, User, Cart, Color, Size, ProductsInCart } = require('../database/models');

//* Add product to cart
const addToCart = async (req, res) => {

    const { idProduct, idCart, quantity, size, color, last } = req.body;

    if (!idProduct || !idCart) {
        return res.status(400).json({ error: "Both 'idProduct' and 'idCart' parameters are required." });
    }

    try {

        const product = await Product.findByPk(parseInt(idProduct));
        const cart = await Cart.findByPk(parseInt(idCart));

        if (product.quantityInStock > 0 && product.quantityInStock >= quantity) {
            const productAdded = await ProductsInCart.create({
                ProductId: idProduct,
                CartId: idCart,
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
        res.status(400).json(error.message);
    }
}

//* Remove product from cart
const remToCart = async (req, res) => {
    const { idProduct, idCart } = req.query;
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
const getCart = async (req, res) => {
    const { idCart } = req.query;
    if (!idCart) {
        return res.status(400).json({ error: "The 'idCart' parameter is required." });
    }
    try {
        const cart = await Cart.findByPk(idCart, {
            include: {
                model: Product,
                attributes: ["id", "name", "description", "price", "quantityInStock", "createdAt"],
                include: [
                    {
                        association: "ProductImgs",
                        attributes: ["id", "imgUrl"],
                    },
                    {
                        association: "Size",
                        attributes: ["id", "sizeNumberAr"],
                        through: {
                            attributes: []
                        },
                    },
                    {
                        association: "Categories",
                        attributes: ["id", "name"],
                        through: {
                            attributes: []
                        },
                    },
                    {
                        association: "Colours",
                        attributes: ["id", "colorName", "colorValue"],
                        through: {
                            attributes: []
                        },
                    },
                    {
                        association: "Brand",
                        attributes: ["id", "name", "imgBrand"],
                    },
                    {
                        association: "Last",
                        attributes: ["id", "nameShoelast"],
                        through: {
                            attributes: []
                        }
                    },
                ],
            },
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

//* Empty cart
const deleteCart = async (req, res) => {
    const { idCart } = req.query;
    if (!idCart) {
        return res.status(400).json({ error: "The 'idCart' parameter is required." });
    }
    try {
        const cart = await Cart.findByPk(parseInt(idCart), { include: Product });
        await cart.removeProducts(cart.dataValues.Products);
        await Cart.update({ totalPrice: 0 }, { where: { id: parseInt(idCart) } });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { getCart, addToCart, remToCart, deleteCart }