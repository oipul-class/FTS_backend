"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      {
        role_name: "Gerente vendas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Gerente financeiro",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Gerente estoque",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Gerente geral",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Vendedor",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Caixa",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Estoque",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Financeiro",
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
