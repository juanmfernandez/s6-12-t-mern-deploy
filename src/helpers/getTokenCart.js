const { validateToken } = require("./jwtHandler");

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

module.exports = { getTokenCartId };
