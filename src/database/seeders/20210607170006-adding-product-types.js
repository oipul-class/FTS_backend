"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("product_types", [
      {
        type: "Eletrônico",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Jogos",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Liquido",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Remédio",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: "Outro",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product_types", null, {});
  },
};
