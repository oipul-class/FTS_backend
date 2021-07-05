"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("websites", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      logo_img: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      banner_img: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      slogan: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      primary_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      secondary_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      light_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      dark_color: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("websites");
  },
};
