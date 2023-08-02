require('dotenv').config();
const process = require('process');

const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '64ca3c385a09ce540283462b',
  };

  next();
});
app.use('/', router);

process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
