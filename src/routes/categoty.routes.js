const Router = require('express');
const routerCategories = Router();

// Controllers
const { showAllCategories,
    showCategoryById,
    createCategory,
    updateCategory,
    deleteCategory } = require('../controllers/categories.controller');

// Middlewares
const { validateCategoryData } = require('../validators/category.validator')

routerCategories.get('/', showAllCategories);
routerCategories.get('/:id', showCategoryById);
routerCategories.post('/', validateCategoryData, createCategory);
routerCategories.put('/:id', validateCategoryData, updateCategory);
routerCategories.delete('/:id', deleteCategory);

module.exports = routerCategories;