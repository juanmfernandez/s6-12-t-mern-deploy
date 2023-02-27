'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsInOrder extends Model {
    static associate(models) {
      ProductsInOrder.belongsTo(models.Order)
      ProductsInOrder.belongsTo(models.Product)
    }
  }
  ProductsInOrder.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ProductsInOrder',
    paranoid: true
  });
  return ProductsInOrder;
};