"use strict";
const validator = require('validator');

const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.File)
      User.hasMany(models.Token)
    }
  }

  User.init (
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          isEmailOrPhone(value) {
            if (!validator.isEmail(value) && !validator.isMobilePhone(value)) {
              throw new Error('Email or phone number is needed!');
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  return User;
};