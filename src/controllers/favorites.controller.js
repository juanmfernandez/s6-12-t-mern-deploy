const { Product, User } = require("../database/models");

const addFavorites = async (req, res) => {
    try {

        const { usId, prodId } = req.params;

        const user = await User.findOne({
            where: {
                id: usId
            }
        });

        const product = await Product.findOne({
            where: {
                id: prodId
            }
        });

        const favorited = await user.addFavorite(product);

        return res.status(200).json({ success: `Product ID ${prodId} is now user ${usId}'s favorite` })

    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

const delFavorites = async (req, res) => {
    try {

        const { usId, prodId } = req.params;

        const user = await User.findOne({
            where: {
                id: usId
            }
        });

        const product = await Product.findOne({
            where: {
                id: prodId
            }
        });

        if (!await user.hasFavorite(product)) {
            throw new Error(`Product ID ${prodId} not user ${usId}'s favorite`)
        }

        await user.removeFavorite(product);

        return res.status(200).json({ success: `Product ID ${prodId} is not user ${usId}'s favorite yet` })

    } catch (error) {
        res.status(400).json({ message: error.message })
    };
};

module.exports = {
    addFavorites,
    delFavorites
}