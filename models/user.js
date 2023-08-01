const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь океана",
  },
  avatar: {
    type: String,
    required: true,
    default: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    validate: {
      validator: (v) =>
        validator.isURL(v, {
          protocols: ["http", "https"],
          require_tld: true,
          require_protocol: true,
        }),
      message: "Должен быть действительный URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
