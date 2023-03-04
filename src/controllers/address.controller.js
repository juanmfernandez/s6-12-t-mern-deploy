const { User, Address } = require("../database/models");

const addUserAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { street, number, city, state, zipCode, country, comments } = req.body;
        const newAddress = await Address.create({
            userId: id,
            street,
            number,
            city,
            state,
            zipCode,
            country,
            comments
        });

        if (!newAddress) {
            let msg = email ? `E-mail ${email}` : `Username ${userName}`
            throw new Error(`${msg} already exists in database`)
        }

        res.status(200).json({
            success: `Address added to user ${id}`,
            address: newAddress.dataValues
        })

    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

const updateUserAddress = async (req, res) => {
    try {
        const { id, addId } = req.params;
        const { street, number, city, state, zipCode, country, comments } = req.body;

        const userExists = await User.findByPk(id, {});

        const addressToUpdate = await Address.findByPk(addId, {});

        if (addressToUpdate === null || userExists === null) {
            throw new Error(`Address or user not found in database`)
        }
        if (addressToUpdate.dataValues.userId != id) {
            throw new Error(`This Address is not of user ${id}`)
        }

        const updatedAddress = await addressToUpdate.update({
            street,
            number,
            city,
            state,
            zipCode,
            country,
            comments
        });

        res.status(200).json({
            success: `Address ${addId} updated to user ${id}`,
            address: updatedAddress.dataValues
        })

    } catch (error) {
        res.status(400).json(({ message: error.message }))
    }
}

// Exports
module.exports = {
    addUserAddress,
    updateUserAddress
}