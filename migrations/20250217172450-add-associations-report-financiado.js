"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("ReportFinanciados", "FormFinanciadoId", {
        type: Sequelize.INTEGER,
        references: {
          model: "FormFinanciados",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.addColumn(
          "FormFinanciados",
          "ReportFinanciadoId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "ReportFinanciados",
              key: "id",
            },
          }
        );
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface
      .removeColumn("ReportFinanciados", "FormAlugadoId")
      .then(() => {
        return queryInterface.removeColumn(
          "FormFinanciados",
          "ReportFinanciadoId"
        );
      });
  },
};
