const { Scoreboard } = require('../db/model');

const postNewRecord = (req, res, next) => {
  Scoreboard.create({ generation: req.body.generation, score: req.body.score })
    .then(() => {
      console.log('SUCCESS posting new record');
      res.status(201).send();
    })
    .catch(err => {
      console.log('ERR posting new record');
      res.status(500).send();
    })
};

const getScoreboard = (req, res, next) => {
  Scoreboard.findAll()
    .then((scores) => {
      console.log('SUCCESS getting score board');
      res.status(200).send(scores);
    })
    .catch(err => {
      console.log('ERR getting score board');
      res.status(500).send();
    })
};

const deleteScoreboard = (req, res, next) => {
  Scoreboard.destroy({
    where: {},
    truncate: true
  })
};

module.exports = {
  postNewRecord,
  getScoreboard,
  deleteScoreboard,
};
