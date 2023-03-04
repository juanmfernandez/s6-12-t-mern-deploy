const { check } = require('express-validator');
const { handleValidator } = require('../helpers/validatorHandler');

const validateCategoryData = [
    check('name')
        .exists()
        .withMessage('category name is require')
        .isLength({ min: 3, max: 255 })
        .withMessage('category name should contain atleast 3 characters'),
    (req, res, next) => {
        handleValidator(req, res, next);
    }
]

module.exports = {
    validateCategoryData
}