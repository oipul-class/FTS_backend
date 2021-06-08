"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("plans", [
      {
        plan_name: "Basico",
        branch_limit: 2,
        user_limit_per_branch: 10,
        use_phone_for_sale: false,
        value: 50.00,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], null);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("plans", null, {});
  },
};
