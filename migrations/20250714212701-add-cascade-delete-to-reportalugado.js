"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ReportAlugados", // Nome da tabela que tem a chave estrangeira
      "ReportAlugados_FormAlugadoId_fkey" // O nome exato da restrição que vimos no erro
    );

    // Agora, adicionamos a restrição de volta, com a regra onDelete: 'CASCADE'
    await queryInterface.addConstraint("ReportAlugados", {
      fields: ["FormAlugadoId"], // A coluna da chave estrangeira
      type: "foreign key",
      name: "ReportAlugados_FormAlugadoId_fkey", // Podemos usar o mesmo nome
      references: {
        table: "FormAlugados", // Tabela que a chave referencia
        field: "id",
      },
      onDelete: "CASCADE", // A regra correta
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "ReportAlugados",
      "ReportAlugados_FormAlugadoId_fkey"
    );

    // E adicionamos a versão original (sem o onDelete: 'CASCADE')
    await queryInterface.addConstraint("ReportAlugados", {
      fields: ["FormAlugadoId"],
      type: "foreign key",
      name: "ReportAlugados_FormAlugadoId_fkey",
      references: {
        table: "FormAlugados",
        field: "id",
      },
      // Sem onDelete ou onUpdate, ele volta ao comportamento padrão
    });
  },
};
