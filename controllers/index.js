const highScoreModel = require('../models/high-scores');

function index(req, res) {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('index');
}
