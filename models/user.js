const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    // default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
    // default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
    // default: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
    validate: {
      validator: (v) => validator.isURL(v, {
        protocols: ['http', 'https'],
        require_tld: true,
        require_protocol: true,
      }),
      message: 'Должен быть действительный URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
