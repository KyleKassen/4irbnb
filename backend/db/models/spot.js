'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      })
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        as: 'previewImage'
      })
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type: DataTypes.DECIMAL,
      set() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value);
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      set() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value);
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL,
      set() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value);
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
