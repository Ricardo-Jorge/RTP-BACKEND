"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReportQuitado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReportQuitado.belongsTo(models.FormQuitado, {
        as: "FormQuitados",
        foreignKey: "FormQuitadoId",
      });
    }
  }
  ReportQuitado.init(
    {
      custoImpostosDia: DataTypes.DECIMAL,
      seguroDia: DataTypes.DECIMAL,
      manutencaoDia: DataTypes.DECIMAL,
      custoCombustivel: DataTypes.DECIMAL,
      custoCombustivelDia: DataTypes.DECIMAL,
      custoTotalDia: DataTypes.DECIMAL,
      custoTotal: DataTypes.DECIMAL,
      faturamentoTotal: DataTypes.DECIMAL,
      faturamentoDia: DataTypes.DECIMAL,
      faturamentoHora: DataTypes.DECIMAL,
      faturamentoKm: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "ReportQuitado",
    }
  );
  return ReportQuitado;
};
