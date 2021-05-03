"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      payment_method_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "branches",
          key: "id",
        },
      },

      logbook_invetory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "logbook_inventories",
          key: "id",
        },
      },

      costumer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "costumers",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sales");
  },
};
