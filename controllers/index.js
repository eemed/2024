const HighScoreModel = require('../models/high-scores');

function getTop10() {
  return 0;
}

function index(req, res) {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('index');
}

module.exports = index;
