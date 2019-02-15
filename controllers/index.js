const HighScore = require('../models/high-scores');

const ERR_SAVE = 'Error saving score to database!';
const ERR_VALIDATION = 'Name and score are required!';

function index(req, res) {
  HighScore.find((err, highscores) => {
    if (err) return console.error(err);

    console.log(highscores);
    res.status(200);
    res.header('Content-Type', 'text/html');
    res.render('index', { scores: highscores });
    return console.log('Found items');
  });
}

function add(req, res) {
  if (req.body.name && req.body.score) {
    const highScore = new HighScore({
      name: req.body.name,
      score: req.body.score,
    });

    highScore.save((err) => {
      if (err) {
        console.error(ERR_SAVE);
        res.status(500);
        res.end(ERR_SAVE);
      }
    });
  } else {
    res.status(500);
    res.end(ERR_VALIDATION);
  }
}

module.exports = {
  index,
  add,
};
