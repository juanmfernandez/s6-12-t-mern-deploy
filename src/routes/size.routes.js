const Router = require('express')
const routerSize = Router()

// Controllers
const {
    showAllSizes,
    showSizeById,
    createSize,
    updateSize,
    deleteSize
} = require('../controllers/sizes.controller')

// Middlewares
const { validateSizeData } = require('../validators/size.validator')
const { route } = require('./brands.routes')

// Routes
routerSize.get('/', showAllSizes)
routerSize.get('/:id', showSizeById)
routerSize.post('/', validateSizeData, createSize)
routerSize.put('/:id', validateSizeData, updateSize)
routerSize.delete('/:id', deleteSize)

module.exports = routerSize