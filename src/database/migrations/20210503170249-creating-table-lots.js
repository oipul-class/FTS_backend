"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("lots", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      lot_number: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },

      manufacture_date: {
        type: Sequelize.DATEONLY,
      },

      expiration_date: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("lots");
  },
};
