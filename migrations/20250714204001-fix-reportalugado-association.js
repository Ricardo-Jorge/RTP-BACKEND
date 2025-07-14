"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("FormAlugados", "ReportAlugadoId", {
        transaction,
      });
      await queryInterface.changeColumn(
        "ReportAlugados",
        "FormAlugadoId",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "FormAlugados",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Passo 1 reverso: Adicionar a coluna de volta à tabela FormAlugados
      await queryInterface.addColumn(
        "FormAlugados",
        "ReportAlugadoId",
        {
          type: Sequelize.INTEGER,
          // Adicione outras propriedades se a coluna original as tinha (ex: references)
        },
        { transaction }
      );

      await queryInterface.changeColumn(
        "ReportAlugados",
        "FormAlugadoId",
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "FormAlugados",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL", // ou 'NO ACTION', dependendo do seu padrão anterior
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
