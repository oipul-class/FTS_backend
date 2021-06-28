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
        type: Sequelize.STRING(14),
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

      companie_password: {
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
        references: {
          model: "plans",
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
    await queryInterface.dropTable("companies");
  },
};
