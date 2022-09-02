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
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      })
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        as: 'previewImage',
        onDelete: 'CASCADE'
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
      get() {
        const value = this.getDataValue('lat');
        return value === null ? null : parseFloat(value);
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('lng');
        return value === null ? null : parseFloat(value);
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value);
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        let date = JSON.stringify(this.getDataValue('createdAt'));
        date = date.replace('T', ' ');
        const index = date.indexOf('.');
        date = date.slice(1, index);
        return date;
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        let date = JSON.stringify(this.getDataValue('updatedAt'));
        date = date.replace('T', ' ');
        const index = date.indexOf('.');
        date = date.slice(1, index);
        return date;
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
