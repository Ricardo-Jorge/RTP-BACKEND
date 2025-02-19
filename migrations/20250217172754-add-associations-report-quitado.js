"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("ReportQuitados", "FormQuitadoId", {
        type: Sequelize.INTEGER,
        references: {
          model: "FormQuitados",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.addColumn("FormQuitados", "ReportQuitadoId", {
          type: Sequelize.INTEGER,
          references: {
            model: "ReportQuitados",
            key: "id",
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface
      .removeColumn("ReportFinanciados", "FormQuitadoId")
      .then(() => {
        return queryInterface.removeColumn("FormQuitados", "ReportQuitadoId");
      });
  },
};
