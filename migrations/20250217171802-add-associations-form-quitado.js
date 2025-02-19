"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("FormQuitados", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.addColumn("Users", "FormQuitadoId", {
          type: Sequelize.INTEGER,
          references: {
            model: "FormQuitados",
            key: "id",
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("FormQuitados", "UserId").then(() => {
      return queryInterface.removeColumn("Users", "FormQuitadoId");
    });
  },
};
