'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      product_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
      },

      bar_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cost_per_item: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      
      unit_of_measurement_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "units_of_measurement",
          key: "id",
        },
      },

      product_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product_types",
          key: "id",
        },
      },
      
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products")
  }
};
