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
        name: 'Home in Forney',
        description: 'Perfect Stay in Ranch-like House w Huge Backyard!',
        price: 191
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
        description: 'Plano Mansion with Huge Pool',
        price: 1000
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
        ownerId: 3,
        address: "145 Natalie St",
        city: 'College Station',
        state: 'TX',
        country: 'Uniasdfted States',
        lat: 30.6187,
        lng: -96.3365,
        name: 'Trailer sdfPark Shenanigans',
        description: 'Beutiful Mansion',
        price: 1540
      },
      {
        ownerId: 4,
        address: "2412 Texas Ave.",
        city: 'College Station',
        state: 'TX',
        country: 'Uniasdfted States',
        lat: 30.6068,
        lng: -96.3114,
        name: 'The House Number cuatro',
        description: 'Beutiful Mansion',
        price: 1540
      },
      {
        ownerId: 4,
        address: "2111 Bevis St",
        city: 'Houston',
        state: 'TX',
        country: 'United States',
        lat: 29.802675,
        lng: -95.422332,
        name: 'The House Number Five',
        description: 'Great Place in Houston',
        price: 100
      },
      {
        ownerId: 4,
        address: "1199 Bosque Blvd",
        city: 'Waco',
        state: 'TX',
        country: 'United States',
        lat: 31.560907,
        lng: -97.141265,
        name: 'The House Number Six',
        description: 'Hidden GLAMPING OASIS- Close to Everything!',
        price: 106
      },
      {
        ownerId: 4,
        address: "9999 Avenue",
        city: 'San Antonio',
        state: 'TX',
        country: 'United States',
        lat: 29.424585,
        lng: -98.494636,
        name: 'The House Number Seven',
        description: 'San Antonio - Great Home',
        price: 140
      },
      {
        ownerId: 4,
        address: "8888 Avenue",
        city: 'Austin',
        state: 'TX',
        country: 'United States',
        lat: 30.264265,
        lng: -97.747505,
        name: 'The House Number Eight',
        description: 'Austin - Great Home',
        price: 150
      },
      {
        ownerId: 4,
        address: "7777 Avenue",
        city: 'Paris',
        state: 'TX',
        country: 'United States',
        lat: 33.660068,
        lng: -95.555397,
        name: 'The House Number Nine',
        description: 'Paris - Great Home',
        price: 150
      },
      {
        ownerId: 4,
        address: "6666 Avenue",
        city: 'Fort Worth',
        state: 'TX',
        country: 'United States',
        lat: 32.748573,
        lng: -97.330963,
        name: 'The House Number Ten',
        description: 'Fort Worth - Great Home',
        price: 160
      },
      {
        ownerId: 4,
        address: "5555 Avenue",
        city: 'El Paso',
        state: 'TX',
        country: 'United States',
        lat: 31.761623,
        lng: -106.485633,
        name: 'The House Number Eleven',
        description: 'El Paso - Great Home',
        price: 170
      },
      {
        ownerId: 4,
        address: "4444 Avenue",
        city: 'Arlington',
        state: 'TX',
        country: 'United States',
        lat: 32.735633,
        lng: -97.108352,
        name: 'The House Number Twelve',
        description: 'Arlington - Great Home',
        price: 180
      },
      {
        ownerId: 4,
        address: "3333 Avenue",
        city: 'Corpus Christi',
        state: 'TX',
        country: 'United States',
        lat: 27.795890,
        lng: -97.405250,
        name: 'The House Number Thirteen',
        description: 'Corpus Christi - Great Home',
        price: 190
      },
      {
        ownerId: 4,
        address: "2222 Avenue",
        city: 'Lubbock',
        state: 'TX',
        country: 'United States',
        lat: 33.583564,
        lng: -101.853950,
        name: 'The House Number Fourteen',
        description: 'Lubbock - Great Home',
        price: 200
      },
      {
        ownerId: 4,
        address: "1111 Avenue",
        city: 'Laredo',
        state: 'TX',
        country: 'United States',
        lat: 27.507879,
        lng: -99.507003,
        name: 'The House Number Fifteen',
        description: 'Laredo - Great Home',
        price: 210
      },
      {
        ownerId: 4,
        address: "9999 Way",
        city: 'Irving',
        state: 'TX',
        country: 'United States',
        lat: 32.829518,
        lng: -96.944217,
        name: 'The House Number Sixteen',
        description: 'Irving - Great Home',
        price: 220
      },
      {
        ownerId: 4,
        address: "8888 Way",
        city: 'Garland',
        state: 'TX',
        country: 'United States',
        lat: 32.912624,
        lng: -96.638883,
        name: 'The House Number Seventeen',
        description: 'Garland - Great Home',
        price: 230
      },
      {
        ownerId: 4,
        address: "7777 Way",
        city: 'Frisco',
        state: 'TX',
        country: 'United States',
        lat: 33.150674,
        lng: -96.823611,
        name: 'The House Number Eighteen',
        description: 'Frisco - Great Home',
        price: 240
      },
      {
        ownerId: 4,
        address: "6666 Way",
        city: 'McKinney',
        state: 'TX',
        country: 'United States',
        lat: 33.197649,
        lng: -96.615447,
        name: 'The House Number Twenty',
        description: 'McKinney - Great Home',
        price: 250
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
      address: { [Op.in]: ['1744 Lone Star Blvd', '6517 Renewal Rd', '130 Ridge Crest', "130 asdfRidge Crest", "130 Bridge Crest", "2111 Bevis St", "1199 Bosque Blvd", "9999 Avenue", "8888 Avenue", "7777 Avenue", "6666 Avenue", "5555 Avenue", "4444 Avenue", "3333 Avenue", "2222 Avenue", "1111 Avenue", "9999 Way", "8888 Way", "7777 Way", "6666 Way"] }
    }, {});
  }
};
