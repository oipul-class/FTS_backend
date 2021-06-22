"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("companies", "address_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "addresses",
        key: "id",
      },
    });

    await queryInterface.addColumn("branches", "address_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "addresses",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColun("companies", "address_id", {});
    await queryInterface.removeColun("branches", "address_id", {});
  },
};
