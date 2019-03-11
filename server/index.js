const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const db = require('../db/model');
const path = require('path');

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Routes
app.use('/', router);

// 404
app.use((req, res, next) => {
  res.status(404);
  res.send({ error: 'Not Found' });
});

const port = 1337;
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = {
  app,
};
