"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("FormFinanciados", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.addColumn("Users", "FormFinanciadoId", {
          type: Sequelize.INTEGER,
          references: {
            model: "FormFinanciados",
            key: "id",
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("FormFinanciados", "UserId").then(() => {
      return queryInterface.removeColumn("Users", "FormFinanciadoId");
    });
  },
};
