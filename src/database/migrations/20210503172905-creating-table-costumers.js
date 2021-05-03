"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("costumers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      costumers_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING(14),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("costumers");
  },
};