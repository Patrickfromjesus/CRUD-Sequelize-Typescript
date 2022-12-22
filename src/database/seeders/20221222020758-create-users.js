'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'pessoa1',
        email: 'pessoa1@test.com',
        password: 'password1',
      },
      {
        name: 'pessoa2',
        email: 'pessoa2@test.com',
        password: 'password2',
      },
      {
        name: 'pessoa3',
        email: 'pessoa3@test.com',
        password: 'password3',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
