require('dotenv').config();
const process = require('process');

const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {});

app.use('/', router);

// обработчик ошибок celebrate
router.use(errors());

// централизованный обработчик ошиибок
app.use(errorHandler);

// обработчик не учтенных ошибок
process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
