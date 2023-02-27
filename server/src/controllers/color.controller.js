const { Color } = require('../database/models/index');

const showAllColors = async (req, res) => {
    const colors = await Color.findAll();

    if(colors) {
        return res.status(200).json(colors);
    } else {
        return res.status(404).json({message:'colors not found'});
    }
}

const showColorById = async (req, res) => {
    const colorId = req.params.colorId;
    
    const color = await Color.findByPk(colorId);

    if(color) {
        return res.status(200).json({color});
    } else {
        return res.status(404).json({message: 'color not found'});
    }
}

const createColor = async (req, res) => {
    const newColor = req.body

    const color = await Color.create(newColor);

    if(color) {
        return res.status(201).json({message:'color created succesfully', color});
    } else {
        return res.status(400).json({message:'data has not been received'});
    }
}

const updateColor = async (req, res) => {
    const colorId = req.params.colorId;
    
    const prevColor = await Color.findByPk(colorId);

    if(prevColor){
        const data = req.body
        prevColor.colorName = data.colorName;
        prevColor.colorValue = data.colorValue;

        prevColor.save(prevColor).then(color => {
            return res.status(200).json({message:'Color updated successfully',color});
        });
    } else {
        return res.status(404).json({message:'color not found'});
    }
}

const deleteColor = async (req, res) => {
    const colorId = req.params.colorId;
    
    const color = await Color.findByPk(colorId);

    if(color){
        color.destroy().then(()=>{
            return res.status(200).json({message:'color deleted succesfully'});
        })
    } else {
        return res.status(404).json({message:'color not found'});
    }
}

module.exports = {
    showAllColors,
    showColorById,
    createColor,
    updateColor,
    deleteColor
}
