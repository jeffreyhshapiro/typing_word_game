const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let WordTimes = sequelize.define('word_times', {
    word: {
      type: sequelize.STRING
    }
  });
}
