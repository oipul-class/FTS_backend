"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("phones", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      phone: {
        type: Sequelize.STRING(12),
        allowNull: false,
        unique: true,
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("phones");
  },
};
