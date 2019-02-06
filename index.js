const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const host = 'localhost';
const port = '3000';

const app = express();

app.get('/', () => {
  
})

app.listen(port, host, () => {
  console.log(`Server listening at ${host}:${port}`);
});
