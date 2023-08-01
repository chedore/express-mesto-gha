require("dotenv").config();
const process = require('process');
const { PORT = 3000, DB_HOST } = process.env;
const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/index");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use("/", router);


process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
