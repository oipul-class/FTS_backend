'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("employers", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      rg: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      manager_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "managers",
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
    await queryInterface.dropTable("employers");
  }
};
