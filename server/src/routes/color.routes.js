// Router
const Router = require('express');
const colorRouter = Router();

// Controllers
const {showAllColors, showColorById, createColor, updateColor, deleteColor} = require('../controllers/color.controller');

// Routes

colorRouter.get('/',showAllColors);
colorRouter.get('/:colorId',showColorById);
colorRouter.post('/',createColor);
colorRouter.put('/:colorId',updateColor);
colorRouter.delete('/:colorId',deleteColor);

module.exports = colorRouter;