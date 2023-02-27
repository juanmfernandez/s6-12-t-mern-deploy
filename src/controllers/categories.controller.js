const { Category } = require('../database/models/index')

// Show all categories
const showAllCategories = async (req, res) => {
    let categories = await Category.findAll();
    if (categories) {
        return res.status(200).json({ categories });
    } else {
        return res.status(404).json({ 'message': 'categories not found' });
    }
}

const showCategoryById = async (req, res) => {
    let { id } = req.params
    let category = await Category.findByPk(id)

    if (category) {
        return res.status(200).json({ category })
    } else {
        return res.status(404).json({ 'message': 'category not found' })
    }
}

const createCategory = async (req, res) => {
    let params = req.body
    const category = await Category.create(params)

    if (category) {
        return res.status(200).json({ 'message': 'category created succesfully', category })
    } else {
        return res.status(200).json({ 'message': 'data has not been received' })
    }
}

const updateCategory = async (req, res) => {
    let { id } = req.params
    const category = await Category.findByPk(id);

    if (category) {
        const data = req.body
        category.name = data.name

        let savedCategory = await category.save()
        if(savedCategory) {
            return res.status(200).json({ 'message': 'category updated successfully', 'category': savedCategory })
        } else {
            return res.status(400).json({ 'message': 'category was not saved', 'category': savedCategory })
        }
    } else {
        return res.status(404).json({ 'message': 'category not found' })
    }
}

const deleteCategory = async (req, res) => {
    let { id } = req.params
    const category = await Category.findByPk(id);

    if (category) {
        await category.destroy()
        return res.status(200).json({ 'message': 'category deleted successfully' })
    } else {
        return res.status(404).json({ 'message': 'category not found' })
    }
}

// Exports
module.exports = {
    showAllCategories,
    showCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}