const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return GameSession = sequelize.define('game_session', {
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
}
