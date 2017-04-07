const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return WordTimes = sequelize.define('word_times', {
    word: {
      type: DataTypes.STRING,
      allowNull: false
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
}
