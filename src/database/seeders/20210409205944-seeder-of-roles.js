"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      {
        role_name: "compras",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "vendas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "produtos",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
