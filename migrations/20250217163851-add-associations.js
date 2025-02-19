"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("FormAlugados", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.addColumn("Users", "FormAlugadoId", {
          type: Sequelize.INTEGER,
          references: {
            model: "FormAlugados",
            key: "id",
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("FormAlugados", "UserId").then(() => {
      return queryInterface.removeColumn("Users", "FormAlugadoId");
    });
  },
};
