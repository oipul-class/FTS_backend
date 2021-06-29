"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bills_to_pay", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      purchase_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "purchases",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("bills_to_pay");
  },
};
