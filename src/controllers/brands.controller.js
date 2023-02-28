const { Brand } = require("../database/models");

// Show all brands
const showAllBrands = async (req, res) => {
    let brand = await Brand.findAll({
        attributes: ['id', 'name', 'comment' , 'imgBrand']
      })
    if (brand) {
        return res.status(200).json({ brand });
    } else {
        return res.status(404).json({ 'message': 'brand not found' });
    }
}

// Exports
module.exports = {
    showAllBrands
}
