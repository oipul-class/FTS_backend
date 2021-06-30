"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("websites", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      website_logo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // website_banner: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },

      website_slogan: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      website_customization: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('websites');
  },
};
