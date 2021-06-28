"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("logbook_inventories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      date_of_acquisition: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      quantity_acquired: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      
      branch_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "branches",
          key: "id",
        },
      },

      lot_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "lots",
          key: "id",
        },
      },

      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("logbook_inventories");
  },
};
