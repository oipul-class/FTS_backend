"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("branches", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      branch_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },

      branch_email: {
        type: Sequelize.STRING,
      },

      place_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "companies",
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
    await queryInterface.dropTable("branches");
  },
};
