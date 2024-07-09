const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const validator = require('validator');

const User = sequelize.define('User', {
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
});

module.exports = User;