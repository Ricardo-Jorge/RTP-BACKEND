"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ReportFinanciados",
      "ReportFinanciados_FormFinanciadoId_fkey"
    );

    await queryInterface.addConstraint("ReportFinanciados", {
      fields: ["FormFinanciadoId"],
      type: "foreign key",
      name: "ReportFinanciados_FormFinanciadoId_fkey",
      references: {
        table: "FormFinanciados",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ReportFinanciados",
      "ReportFinanciados_FormFinanciadoId_fkey"
    );

    await queryInterface.addConstraint("ReportFinanciados", {
      fields: ["FormFinanciadoId"],
      type: "foreign key",
      name: "ReportFinanciados_FormFinanciadoId_fkey",
      references: {
        table: "FormFinanciados",
        field: "id",
      },
    });
  },
};
