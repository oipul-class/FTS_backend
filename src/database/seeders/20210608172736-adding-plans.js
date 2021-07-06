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
          access_website: false,
          value: 199.99,
          description:
            "Este é o plano ideal para você que tem um pequeno negócio e quer introduzir o seu comércio a tecnologia que nós oferecemos, possuimos um sistema simples e rápido, com uma ótima capacidade para somar no dia a dia da sua empresa",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          plan_name: "Intermediário",
          branch_limit: 5,
          user_limit_per_branch: 50,
          use_phone_for_sale: true,
          access_website: false,
          value: 349.99,
          description:
            "Este é o plano ideal para você que tem um pequeno negócio e quer introduzir o seu comércio a tecnologia que nós oferecemos, possuimos um sistema simples e rápido, com uma ótima capacidade para somar no dia a dia da sua empresa",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          plan_name: "Premium",
          branch_limit: 10,
          user_limit_per_branch: 100,
          use_phone_for_sale: true,
          access_website: true,
          value: 549.99,
          description:
            "Este é o plano ideal para você que tem um pequeno negócio e quer introduzir o seu comércio a tecnologia que nós oferecemos, possuimos um sistema simples e rápido, com uma ótima capacidade para somar no dia a dia da sua empresa",
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
