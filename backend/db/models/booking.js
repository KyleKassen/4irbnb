'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
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
    modelName: 'Booking',
  });
  return Booking;
};
