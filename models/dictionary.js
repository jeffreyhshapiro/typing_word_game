const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return Dictionary = sequelize.define('dictionary', {
    word: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}
