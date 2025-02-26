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
        onDelete: "CASCADE",
      });
    }
  }
  ReportQuitado.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      custoImpostosDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      seguroDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      manutencaoDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoCombustivel: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoCombustivelDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoTotalDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      faturamentoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      faturamentoDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      faturamentoKm: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReportQuitado",
    }
  );
  return ReportQuitado;
};
