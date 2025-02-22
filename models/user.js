"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.FormAlugado, {
        as: "FormAlugados",
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.FormFinanciado, {
        as: "FormFinanciados",
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.FormQuitado, {
        as: "FormQuitados",
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "Users",
    }
  );
  return User;
};
