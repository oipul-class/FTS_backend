"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("adresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },

      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      complement: {
        type: Sequelize.STRING,
      },

      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      uf: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("adresses");
  },
};
