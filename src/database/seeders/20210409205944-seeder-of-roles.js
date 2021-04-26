"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      {
        role_name: "Gerente de vendas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Gerente de compras",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Gerente financeiro",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Gerente de estoque",
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
        role_name: "Funcionário de estoque",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Funcionário de compras",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Funcionário do financeiro",
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
