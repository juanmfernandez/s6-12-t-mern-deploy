'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product);
    }
  }
  Brand.init({
    name: DataTypes.STRING,
    imgBrand: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
    paranoid: true
  });
  return Brand;
};