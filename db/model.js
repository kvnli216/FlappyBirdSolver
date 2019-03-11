const Sequelize = require('sequelize');
const connection = new Sequelize('hr_mvp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

connection.authenticate()
  .then(() => console.log('Connected to hr_mvp database'))
  .catch(err => console.error(err));

const Scoreboard = connection.define('score', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  generation: Sequelize.INTEGER,
  score: Sequelize.INTEGER,
});

// force: true will drop the table if it already exists
Scoreboard.sync({force: true});

module.exports = {
  Scoreboard,
}