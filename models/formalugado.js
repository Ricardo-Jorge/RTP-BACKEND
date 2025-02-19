"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FormAlugado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FormAlugado.belongsTo(models.User, {
        as: "Users",
        foreignKey: "UserId",
      });
      FormAlugado.hasOne(models.ReportAlugado, {
        as: "FormAlugados",
        foreignKey: "FormAlugadoId",
        onDelete: "CASCADE",
      });
    }
  }
  FormAlugado.init(
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
      valorFranquiaSem: {
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
      diasTrabalhadosSem: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
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
      kilometragemSem: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FormAlugado",
    }
  );
  return FormAlugado;
};
