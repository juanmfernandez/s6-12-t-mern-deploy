'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoeLast extends Model {
    static associate(models) {
      ShoeLast.belongsToMany(models.Product, {
        through: 'ProductShoeLast',
        foreignKey: "shoeLastId",
        otherKey: "productId"
      })
    }
  }
  ShoeLast.init({
    nameShoelast: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ShoeLast',
    paranoid: true
  });
  return ShoeLast;
};