'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'firstName', {
          type: Sequelize.STRING,
          allowNull: false
        },
        {transaction: t}),
        queryInterface.addColumn('Users', 'lastName', {
          type: Sequelize.STRING,
          allowNull: false
        },
        {transaction: t})
      ])

    })
  },

  down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // return queryInterface.sequelize.transaction(t => {
    //   return Promise.all([
    //     queryInterface.removeColumn('Users', 'firstName', { transaction: t}),
    //     queryInterface.removeColumn('Users', 'lastName', {transaction: t})
    //   ])

    // })
    return Promise.resolve();
  }
};

