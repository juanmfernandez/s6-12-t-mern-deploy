'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Address.init({
    userId: DataTypes.INTEGER,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    betweenStreets: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    country: DataTypes.STRING,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
    paranoid: true
  });
  return Address;
};