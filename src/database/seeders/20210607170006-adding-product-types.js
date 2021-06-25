"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "product_types",
      [
        {
          type: "Eletrônico",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Jogos",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Remédio",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Alimentos Básicos",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Bazar",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Bebidas Alcoólicas",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Bebidas não Alcoólicas",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Descartáveis",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Limpeza",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Limpeza Pessoal",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Saude",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Beleza",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Banho",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Roupas",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Papelaria",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Automotivos",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Doces",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Matinais",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Frutas, Vegetais e Legumes",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Carnes",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Frutos do Mar",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: "Outro",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("product_types", null, {});
  },
};
