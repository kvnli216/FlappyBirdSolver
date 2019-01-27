const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Middleware
app.use(bodyParser.urlencoded());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '/../client/dist')));

// Routes
app.use('/', router);

// 404
app.use((req, res, next) => {
  res.status(404);
  res.send({ error: 'Not Found' });
});

module.exports = app;
