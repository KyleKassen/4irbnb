'use strict';


const bookingsData = [
  {
    spotId: 1,
    userId: 3,
    startDate: '2022-10-10',
    endDate: '2022-10-12',
  },
  {
    spotId: 1,
    userId: 2,
    startDate: '2022-11-15',
    endDate: '2022-11-17',
  },
  {
    spotId: 1,
    userId: 1,
    startDate: '2022-12-10',
    endDate: '2022-12-12',
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', bookingsData, {})
  },

  async down(queryInterface, Sequelize) {
    const { Op } = require('sequelize');
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', { [Op.or]: bookingsData }, {});
  }
};
