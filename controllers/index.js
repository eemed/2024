const HighScoreModel = require('../models/high-scores');

function index(req, res) {
  HighScoreModel.find((err, highscores) => {
    if (err) return console.error(err);

    console.log(highscores);
    res.status(200);
    res.header('Content-Type', 'text/html');
    res.render('index', { scores: highscores });
    return console.log('Found items');
  });
}

module.exports = index;
