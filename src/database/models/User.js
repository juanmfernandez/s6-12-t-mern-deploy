'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Address, {
        as:"Addresses",
        foreignKey: 'userId'
      })
      User.hasMany(models.Order, {
        foreignKey: 'userId'
      })
      User.belongsToMany(models.Product, {
        as: "Favorite",
        through: 'Favorites',
        foreignKey: "userId",
        otherKey: "productId"
      })
      User.hasMany(models.Review);
      User.belongsTo(models.Cart, {
        as:"Cart",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    documentId: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};