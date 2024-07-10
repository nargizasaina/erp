"use strict";

const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      File.belongsTo(models.User)
    }
  }

  File.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      extension: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      data: {
        type: Sequelize.BLOB('long'),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "File",
    },
  );

  return File;
};
