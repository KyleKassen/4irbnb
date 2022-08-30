'use strict';

const spotImageData = [
  {
    spotId: 1,
    url: 'https://photos.zillowstatic.com/fp/b83f60919fc1e1a471163741e91db34d-uncropped_scaled_within_1536_1152.webp',
    preview: true,
  },
  {
    spotId: 2,
    url: 'https://photos.zillowstatic.com/fp/9e804679edff0876405d76baea5a32af-uncropped_scaled_within_1536_1152.webp',
    preview: true,
  },
  {
    spotId: 1,
    url: 'https://photos.zillowstatic.com/fp/6223d1988a478676ec5bb2e14b696b1c-uncropped_scaled_within_1536_1152.webp',
    preview: false,
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('SpotImages', spotImageData, {});
  },

  async down (queryInterface, Sequelize) {
    const { Op } = require('sequelize');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', { [Op.or]: spotImageData }, {});
  }
};
