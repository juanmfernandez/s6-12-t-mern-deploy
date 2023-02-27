'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImg extends Model {
    static associate(models) {
      ProductImg.belongsTo(models.Product);
    }
  }
  ProductImg.init({
    imgUrl: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductImg',
    paranoid: true
  });
  return ProductImg;
};