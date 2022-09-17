'use strict';

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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "1744 Lone Star Blvd",
        city: 'Forney',
        state: 'TX',
        country: 'United States',
        lat: 32.684000,
        lng: -96.405580,
        name: 'Party Central',
        description: 'Perfect place for a great time',
        price: 1500.50
      },
      {
        ownerId: 2,
        address: "6517 Renewal Rd",
        city: 'Plano',
        state: 'TX',
        country: 'United States',
        lat: 33.062710,
        lng: -96.683260,
        name: 'Party Central 2.0',
        description: 'Plenty of house to destory. Enjoy.',
        price: 950
      },
      {
        ownerId: 3,
        address: "130 Ridge Crest",
        city: 'College Station',
        state: 'TX',
        country: 'United States',
        lat: 30.562280,
        lng: -96.316510,
        name: 'Trailer Park Shenanigans',
        description: 'Beutiful Mansion',
        price: 150
      },
      {
        ownerId: 4,
        address: "130 asdfRidge Crest",
        city: 'College asdfStation',
        state: 'TX',
        country: 'Uniasdfted States',
        lat: 30.562280,
        lng: -96.316510,
        name: 'Trailer sdfPark Shenanigans',
        description: 'Beutasdfiful Mansion',
        price: 1540
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['1744 Lone Star Blvd', '6517 Renewal Rd', '130 Ridge Crest'] }
    }, {});
  }
};
