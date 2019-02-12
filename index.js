const express = require('express');
const helmet = require('helmet');
const index = require('./controllers/index');

const port = 3000;
const app = express();

app.use(helmet());

app.get('/', (req, res) => {
  index(req, res);
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
