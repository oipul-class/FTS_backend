"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("screens_permissions", [
      //ADMINISTRADOR
      {
        screen_id: 1,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 2,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 3,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 4,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 6,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 7,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 8,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      //GERENTE GERAL
      {
        screen_id: 1,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 2,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 3,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 4,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 6,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        screen_id: 1,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      //GERENTE
      {
        screen_id: 1,
        permission_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },

      //ESTOQUE
      {
        screen_id: 2,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 3,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 4,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        screen_id: 6,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },

      //FINANCEIRO
      {
        screen_id: 4,
        permission_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },

      //CAIXA
      {
        screen_id: 5,
        permission_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("screens_permissions");
  },
};
