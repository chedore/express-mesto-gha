require("dotenv").config();
const { PORT = 3001, NAME } = process.env;
const express = require("express");
const router = require('./routes/index')

const app = express();

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
