"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_name: {
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

      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "managers",
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
