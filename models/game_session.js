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

//TODO add a column that says how many games are played in a session
//TODO add a column that specifies what OS the user is accessing the game from (node OS module)
