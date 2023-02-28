const jwt = require('jsonwebtoken')
const { validateToken } = require("../helpers/jwtHandler");

const ownership = async (req, res, next) => {
    let token;
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        const decoded = validateToken(token);
        
        if (!decoded.user.isAdmin) {
            if (decoded.user.id != req.params.id) {
                return false;
            }
        }

        req.user = decoded.user

        next()

    } catch (error) {
        res.status(400).json(({ message: (error.message) }))
    }
}

module.exports = {
    ownership
}