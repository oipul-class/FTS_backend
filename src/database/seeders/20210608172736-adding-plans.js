"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "plans",
      [
        {
          plan_name: "Basico",
          branch_limit: 2,
          user_limit_per_branch: 10,
          use_phone_for_sale: false,
          value: 50.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          plan_name: "Intermediário",
          branch_limit: 5,
          user_limit_per_branch: 50,
          use_phone_for_sale: true,
          value: 200.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          plan_name: "Premium",
          branch_limit: 10,
          user_limit_per_branch: 100,
          use_phone_for_sale: true,
          value: 500.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      null
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("plans", null, {});
  },
};
