const { check } = require('express-validator')
const { handleValidator } = require('../helpers/validatorHandler')

const validateSizeData = [
    check('sizeNameAr')
    .exists()
    .withMessage('size name Ar is require')
    .isLength({
        min:4,
        max:255
    })
    .withMessage('size name Ar should contain atleast 3 characters'),
    check('sizeNumberAr')
    .exists()
    .withMessage('size number Ar is require')
    .isFloat()
    .withMessage('size number Ar must be a number'),
    check('cmEquiv')
    .exists()
    .withMessage('cm equiv is require')
    .isFloat()
    .withMessage('cm equiv must be a number')
]

module.exports = {
    validateSizeData
}