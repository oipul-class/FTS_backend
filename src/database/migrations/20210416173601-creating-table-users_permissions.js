'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users_permissions", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users_permissions");
  }
};
