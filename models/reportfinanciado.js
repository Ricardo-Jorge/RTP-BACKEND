"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReportFinanciado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReportFinanciado.belongsTo(models.FormFinanciado, {
        as: "FormFinanciados",
        foreignKey: "FormFinanciadosId",
      });
    }
  }
  ReportFinanciado.init(
    {
      custoFinanciamentoDia: DataTypes.DECIMAL,
      custoImpostosDia: DataTypes.DECIMAL,
      seguroDia: DataTypes.DECIMAL,
      manutencaoDia: DataTypes.DECIMAL,
      custoCombustivel: DataTypes.DECIMAL,
      custoCombustivelDia: DataTypes.DECIMAL,
      custoTotalDia: DataTypes.DECIMAL,
      custoTotal: DataTypes.DECIMAL,
      faturamentoTotal: DataTypes.DECIMAL,
      faturamentoDia: DataTypes.DECIMAL,
      faturamentoKm: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "ReportFinanciado",
    }
  );
  return ReportFinanciado;
};
