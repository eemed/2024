const mongoose = require('mongoose');

const { Schema } = mongoose;

const dbName = '2048';
const mongoUrl = `mongodb://localhost/${dbName}`;

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('open', () => {
  console.log(`Connected to ${mongoUrl}`);
});
db.on('error', (err) => {
  console.error('Connection error:', err);
});

const hsSchema = new Schema({
  name: String,
  score: Number,
  // date: Date,
});

const HighScore = mongoose.model('highscore', hsSchema);

module.exports = HighScore;
