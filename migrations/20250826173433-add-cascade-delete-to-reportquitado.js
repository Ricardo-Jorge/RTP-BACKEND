"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ReportQuitados",
      "ReportQuitados_FormQuitadoId_fkey"
    );

    await queryInterface.addConstraint("ReportQuitados", {
      fields: ["FormQuitadoId"],
      type: "foreign key",
      name: "ReportQuitados_FormQuitadoId_fkey",
      references: {
        table: "FormQuitados",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ReportQuitados",
      "ReportQuitados_FormQuitadoId_fkey"
    );

    await queryInterface.addConstraint("ReportQuitados", {
      fields: ["FormQuitadoId"],
      type: "foreign key",
      name: "ReportQuitados_FormQuitadoId_fkey",
      references: {
        table: "FormQuitados",
        field: "id",
      },
    });
  },
};
