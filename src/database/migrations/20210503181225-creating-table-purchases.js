"use strict";

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
          model: "payment_methods",
          key: "id",
        },
      },

      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "branches",
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

      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("purchases");
  },
};
