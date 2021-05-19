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
        type: Sequelize.DATE,
        allowNull: false,
      },

      quantity_acquired: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      total_value: {
        type: Sequelize.DECIMAL(6, 2),
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

      costumer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "costumers",
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
