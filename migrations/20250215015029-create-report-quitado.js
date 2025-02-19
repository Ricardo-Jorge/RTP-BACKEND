"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReportQuitados", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      custoImpostosDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      seguroDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      manutencaoDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoCombustivel: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoCombustivelDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoTotalDia: {
        type: Sequelize.DECIMAL(10, 2),
      },
      custoTotal: {
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
    await queryInterface.dropTable("ReportQuitados");
  },
};
