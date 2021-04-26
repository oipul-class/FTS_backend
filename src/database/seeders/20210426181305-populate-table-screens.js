"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("screens", [
      {
        screen_name: "Cadastro de gerente geral",
        route: "generalManagerRegister",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Cadastro de gerentes",
        route: "managersRegister",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Cadastro de funcionários",
        route: "employeesRegister",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Relatórios de estoque",
        route: "inventoryReports",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Relatórios de vendas",
        route: "salesReports",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Relatórios de compras",
        route: "purchasesReports",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("screens");
  },
};
