"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("plans", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      plan_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      branch_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      user_limit_per_branch: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      use_phone_for_sale: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      access_website: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      value: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    queryInterface.dropTable("plans");
  },
};
