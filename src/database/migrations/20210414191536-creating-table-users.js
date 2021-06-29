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
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },

      rg: {
        type: Sequelize.STRING(10),
      },

      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "branches",
          key: "id",
        },
      },

      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
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
