const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Картинка",
  },
  link: {
    type: String,
    required: true,
    default:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
