"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReportAlugados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      custoAluguelDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoAluguelMes: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoCombustivelSem: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoCombustivelDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      faturamentoTotal: {
        type: Sequelize.DECIMAL(10, 2),
      },
      faturamentoDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      faturamentoHora: {
        type: Sequelize.DECIMAL(10, 2),
      },
      faturamentoKm: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoDia: {
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable("ReportAlugados");
  },
};
