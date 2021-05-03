'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("item_purchase", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cost_per_item: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      total_value: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
      },

      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },

      purchase_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "purchases",
          key: "id",
        },
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('item_purchase');
  }
};
