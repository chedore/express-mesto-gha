require("dotenv").config();
const { PORT = 3001, NAME } = process.env;
const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/index");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
