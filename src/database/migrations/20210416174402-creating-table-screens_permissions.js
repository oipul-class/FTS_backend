"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("screens_permissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      screen_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "screens",
          key: "id",
        },
      },

      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "permissions",
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
    await queryInterface.dropTable("screens_permissions");
  },
};
