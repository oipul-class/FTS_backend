"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("People", [{}]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("People", null);
  },
};
