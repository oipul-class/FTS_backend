'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("branches", "phone_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "phones",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("branches", "phone_id", {});
  },
};