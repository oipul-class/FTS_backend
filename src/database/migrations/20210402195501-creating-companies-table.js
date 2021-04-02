"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      cnpj: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },

      fantasy_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      social_reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      place_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cep: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      nature_of_the_business: {
        type: Sequelize.STRING,
      },

      commercial_email: {
        type: Sequelize.STRING,
      },

      plan_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("companies");
  },
};
