"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("ReportAlugados", "FormAlugadoId", {
        type: Sequelize.INTEGER,
        references: {
          model: "FormAlugados",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.addColumn("FormAlugados", "ReportAlugadoId", {
          type: Sequelize.INTEGER,
          references: {
            model: "ReportAlugados",
            key: "id",
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface
      .removeColumn("ReportAlugados", "FormAlugadoId")
      .then(() => {
        return queryInterface.removeColumn("FormAlugados", "ReportAlugadoId");
      });
  },
};
