'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Order.belongsToMany(models.Product, { 
        through: models.ProductsInOrder
      }) 
    }
  }
  Order.init({
    totalPrice: DataTypes.FLOAT,
    status: DataTypes.STRING,
    paymentId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
    paranoid: true
  });
  return Order;
};