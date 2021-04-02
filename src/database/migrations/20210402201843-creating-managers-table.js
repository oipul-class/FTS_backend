"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("managers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      manager_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      rg: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },

      cpf: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },

      manager_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      role_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("managers");
  },
};
