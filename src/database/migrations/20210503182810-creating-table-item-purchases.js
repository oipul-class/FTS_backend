"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("item_purchase", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cost_per_item: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      total_value: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },

      discount: {
        type: Sequelize.INTEGER,
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },

      logbook_inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "logbook_inventories",
          key: "id",
        },
      },

      purchase_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "purchases",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("item_purchase");
  },
};
