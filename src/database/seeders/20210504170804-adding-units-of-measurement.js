'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('units_of_measurement', [
      // medida de comprimento
      {
        unit_name: "km",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "m",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "cm",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Unidades de massa
      {
        unit_name: "kg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "g",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "mg",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Medidas de capacidade
      {
        unit_name: "l",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "ml",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Medidas de volume
      {
        unit_name: "km3",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "m3",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "cm3",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "Barrica",
        created_at: new Date(),
        updated_at: new Date(),
      },
      //Outros
      {
        unit_name: "un",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "cx",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "pacote",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "sacas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        unit_name: "pbr",
        created_at: new Date(),
        updated_at: new Date(),
      },

      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("units_of_measurement", null, {});
  }
};
