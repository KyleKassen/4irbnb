'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'userId'
      })
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER,
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
        let date = JSON.stringify(this.getDataValue('createdAt'));
        date = date.replace('T', ' ');
        const index = date.indexOf('.');
        date = date.slice(1, index);
        return date;
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
