const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return Game_Session = sequelize.define('game_session', {
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
}
