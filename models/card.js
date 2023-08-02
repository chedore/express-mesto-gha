const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "type" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "type" - 2'],
    maxlength: [30, 'Максимальная длина поля "type" - 30'],
    // default: 'Картинка',
  },
  link: {
    type: String,
    required: [true, 'Поле "type" должно быть заполнено'],
    // default:
    //   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    validate: {
      validator: (v) => validator.isURL(v, {
        protocols: ['http', 'https'],
        require_tld: true,
        require_protocol: true,
      }),
      message: 'Должен быть действительный URL',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "type" должно быть заполнено'],
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      // default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
