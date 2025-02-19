"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FormAlugados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lucroEsperado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      valorFranquiaSem: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      precoCombustivel: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      consumo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      diasTrabalhadosSem: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
          isInt: true,
        },
      },
      horasTrabalhadas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 24,
          isInt: true,
        },
      },
      kilometragemSem: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FormAlugados");
  },
};
