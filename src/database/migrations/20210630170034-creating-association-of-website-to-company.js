"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("companies", "website_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "websites",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("companies", "website_id", {});
  },
};
