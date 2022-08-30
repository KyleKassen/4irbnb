'use strict';

const reviewImageData = [
  {
    reviewId: 1,
    url: 'https://photos.zillowstatic.com/fp/89934b772a0f4b7bfc737c3783984f5c-uncropped_scaled_within_1536_1152.webp',
  },
  {
    reviewId: 2,
    url: 'https://photos.zillowstatic.com/fp/a79035e5d7e0406c60b57b87d23640e5-uncropped_scaled_within_1536_1152.webp',
  },
  {
    reviewId: 3,
    url: 'https://photos.zillowstatic.com/fp/89934b772a0f4b7bfc737c3783984f5c-uncropped_scaled_within_1536_1152.webp',
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
   await queryInterface.bulkInsert('ReviewImages', reviewImageData, {});
  },

  async down (queryInterface, Sequelize) {
    const { Op } = require('sequelize');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages', { [Op.or]: reviewImageData }, {});
  }
};
