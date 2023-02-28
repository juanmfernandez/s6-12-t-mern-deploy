const { Size } = require('../database/models/index');

const showAllSizes = async (req, res) => {
    const sizes = await Size.findAll()

    if (sizes) {
        return res.status(200).json({ sizes })
    }
}

const showSizeById = async (req, res) => {
    let { id } = req.params
    let size = await Size.findByPk(id)

    if (size) {
        return res.status(200).json({ size })
    } else {
        return res.status(404).json({ 'message': 'size not found' })
    }
}

const createSize = async (req, res) => {
    let params = req.body
    const size = await Size.create(params)

    if (size) {
        return res.status(200).json({ 'message': 'size created succesfully', size })
    } else {
        return res.status(200).json({ 'message': 'data has not been received' })
    }
}

const updateSize = async (req, res) => {
    let { id } = req.params
    const size = await Size.findByPk(id)

    if (size) {
        const data = req.body
        size.sizeNameAr = data.sizeNameAr
        size.sizeNumberAr = data.sizeNumberAr
        size.cmEquiv = data.cmEquiv

        let savedSize = await size.save()
        if (savedSize) {
            return res.status(200).json({
                'message': 'size updated successfully',
                'size': savedSize
            })
        } else {
            return res.status(200).json({
                'message': 'size was not saved'
            })
        }
    } else {
        return res.status(404).json({
            'message': 'size not found'
        })
    }
}

const deleteSize = async (req, res) => {
    let { id } = req.params
    const size = await Size.findByPk(id)

    if (size) {
        await size.destroy()
        return res.status(200).json({
            'message': 'size deleted succesfully'
        })
    } else {
        return res.status(404).json({
            'message': 'category not found'
        })
    }
}

module.exports = {
    showAllSizes,
    showSizeById,
    createSize,
    updateSize,
    deleteSize
}