'use strict';

const reviewData = [
  {
    spotId: 1,
    userId: 1,
    review: 'Beautiful home love it',
    stars: 5
  },
  {
    spotId: 2,
    userId: 2,
    review: 'Absolute beut of a home.',
    stars: 4
  },
  {
    spotId: 3,
    userId: 3,
    review: 'Worst Home there is',
    stars: 1
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
   await queryInterface.bulkInsert('Reviews', reviewData, {})
  },

  async down (queryInterface, Sequelize) {
    const { Op } = require('sequelize');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', { [Op.or]: reviewData }, {});
  }
};
