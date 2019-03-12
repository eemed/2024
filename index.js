const express = require('express');
const helmet = require('helmet');
const hbs = require('express-hbs');
const path = require('path');
const bodyParser = require('body-parser');
const { index } = require('./controllers');

const port = 3000;
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use('/static', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  index(req, res);
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
