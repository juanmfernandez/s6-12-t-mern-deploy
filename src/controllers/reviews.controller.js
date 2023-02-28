const { Product, User } = require("../database/models");

const addReview = async (req, res) => {
    try {

        const { score, comment } = req.body;

        const { prodId } = req.params;

        const { id } = req.user;

        const user = await User.findOne({
            where: {
                id
            }
        });

        const product = await Product.findOne({
            where: {
                id: prodId
            }
        });

        await product.createReview({ score, comment, UserId: id });

        res.status(200).json({
            success: `Score added  ${score}`,
        })

    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

// Exports
module.exports = {
    addReview
}