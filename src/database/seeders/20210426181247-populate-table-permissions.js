"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("permissions", [
      {
        permission_name: "Administrador",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        permission_name: "Gerente geral",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        permission_name: "Gerente",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        permission_name: "Estoque",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        permission_name: "Financeiro",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        permission_name: "Caixa",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("permissions");
  },
};
