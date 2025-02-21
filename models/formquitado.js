"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FormQuitado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FormQuitado.belongsTo(models.User, {
        as: "Users",
        foreignKey: "UserId",
      });
      FormQuitado.hasOne(models.ReportQuitado, {
        as: "FormQuitados",
        foreignKey: "FormQuitadoId",
        onDelete: "CASCADE",
      });
    }
  }
  FormQuitado.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      lucroEsperado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      precoCombustivel: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      consumo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      folgasMensal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 20,
          isInt: true,
        },
      },
      horasTrabalhadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 24,
          isInt: true,
        },
      },
      ipva: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      licenciamento: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      seguro: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      manutencao: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      kilometragemMes: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FormQuitado",
    }
  );
  return FormQuitado;
};
