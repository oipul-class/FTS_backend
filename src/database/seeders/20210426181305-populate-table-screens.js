"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("screens", [
      {
        screen_name: "Usuários",
        route: "/usersRegister",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Produtos",
        route: "/productsRegister",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Estoque",
        route: "/inventory",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Rel. de estoque",
        route: "/inventoryReports",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // {
      //   screen_name: "Rel. de movimento",
      //   route: "/purchasesReports",
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
      // {
      //   screen_name: "Contas",
      //   route: "/bills",
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
      {
        screen_name: "PDV",
        route: "/pdv",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Compras",
        route: "/purchases",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "Filiais",
        route: "/branchRegister",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_name: "CMS",
        route: "/cms",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("screens");
  },
};
