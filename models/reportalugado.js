"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReportAlugado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReportAlugado.belongsTo(models.FormAlugado, {
        as: "FormAlugados",
        foreignKey: "FormAlugadoId",
        onDelete: "CASCADE",
      });
    }
  }
  ReportAlugado.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      custoAluguelDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoAluguelMes: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoCombustivelSem: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoCombustivelDia: {
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
      faturamentoHora: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      faturamentoKm: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      custoDia: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReportAlugado",
    }
  );
  return ReportAlugado;
};
