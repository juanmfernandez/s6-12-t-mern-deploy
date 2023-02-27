'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsToMany(models.Product, {
        through: models.ProductsInCart,
      });
    }
  }
  Cart.init({
    totalPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Cart',
    paranoid: true
  });
  return Cart;
};