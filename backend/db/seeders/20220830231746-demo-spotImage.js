'use strict';

const spotImageData = [
  {
    spotId: 1,
    url: 'https://photos.zillowstatic.com/fp/b83f60919fc1e1a471163741e91db34d-uncropped_scaled_within_1536_1152.webp',
    preview: true,
  },
  {
    spotId: 1,
    url: 'https://photos.zillowstatic.com/fp/215043cd24694028846fd38676d1c56f-uncropped_scaled_within_1536_1152.webp',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://photos.zillowstatic.com/fp/f582b8c8c74bb466d5b75444f31059d8-uncropped_scaled_within_1536_1152.webp',
    preview: false,
  },
  {
    spotId: 1,
    url: 'https://photos.zillowstatic.com/fp/119c50b685f9fa4a2a3c4a94660d2251-uncropped_scaled_within_1536_1152.webp',
    preview: false,
  },
  {
    spotId: 2,
    url: 'https://photos.zillowstatic.com/fp/9e804679edff0876405d76baea5a32af-uncropped_scaled_within_1536_1152.webp',
    preview: true,
  },
  {
    spotId: 3,
    url: 'https://photos.zillowstatic.com/fp/6223d1988a478676ec5bb2e14b696b1c-uncropped_scaled_within_1536_1152.webp',
    preview: true,
  },
  {
    spotId: 4,
    url: 'https://photos.zillowstatic.com/fp/6223d1988a478676ec5bb2e14b696b1c-uncropped_scaled_within_1536_1152.webp',
    preview: true,
  },
  {
    spotId: 5,
    url: 'https://photos.zillowstatic.com/fp/6223d1988a478676ec5bb2e14b696b1c-uncropped_scaled_within_1536_1152.webp',
    preview: true,
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
