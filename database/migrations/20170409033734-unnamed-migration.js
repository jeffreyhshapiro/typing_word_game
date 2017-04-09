'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'game_sessions',
        'ip',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'game_sessions',
        'os',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'game_sessions',
        'times_played',
        {
          type: Sequelize.INTEGER,
        }
      )
    ]
  }
};
