"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },

      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_access: {
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
    await queryInterface.dropTable("users");
  },
};
