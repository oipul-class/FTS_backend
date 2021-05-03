'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("purchases", {
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

      logbook_invetory_id : {
        type: Sequelize.INTEGER,
        references: {
          model: "logbook_inventories",
          key: "id",
        },
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("logbook_inventories")
  }
};
