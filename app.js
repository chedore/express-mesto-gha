require("dotenv").config();
const process = require('process');
const { PORT = 3001, NAME } = process.env;
const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/index");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {});

app.use("/", router);

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
