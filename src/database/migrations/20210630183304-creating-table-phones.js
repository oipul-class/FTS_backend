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
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },

      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "branches",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("phones");
  },
};
