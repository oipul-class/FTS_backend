"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("payment_methods", [
      {
        method: "credito",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        method: "debito",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        method: "boleto",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        method: "paypal",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("payment_methods", null);
  },
};
