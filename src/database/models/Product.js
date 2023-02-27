'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, { 
        through: "ProductCategories", 
        foreignKey: "productId", 
        otherKey: "categoryId" 
      });
      Product.belongsToMany(models.Color, {
        as:"Colours",
        through: 'ProductColors',
        foreignKey: "productId",
        otherKey: "colorId"
      })
      Product.belongsToMany(models.Size, {
        as:"Size",
        through: 'ProductSize',
        foreignKey: "productId", 
        otherKey: "sizeId"
      })
      Product.belongsToMany(models.ShoeLast, {
        as:"Last",
        through: 'ProductShoeLast',
        foreignKey: "productId",
        otherKey: "shoeLastId"
      })
      Product.belongsToMany(models.User, {
        through: 'Favorites',
        foreignKey: "productId",
        otherKey: "userId"
      })
      Product.belongsTo(models.Brand, {
        as:"Brand"
      });
      Product.hasMany(models.ProductImg);
      Product.hasMany(models.Review);
      Product.belongsToMany(models.Order, { through: models.ProductsInOrder });
      Product.belongsToMany(models.Cart, { through: models.ProductsInCart });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantityInStock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true
  });
  return Product;
};