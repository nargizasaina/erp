const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const File = sequelize.define('File', {
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
    allowNull: false
  }
});

File.belongsTo(User, { foreignKey: 'userId' });

module.exports = File;
