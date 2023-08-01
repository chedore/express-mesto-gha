const User = require('../models/user');

/* ----мидлвэр---- */
// Проверим, существует ли пользователь:
const doesUserExist = (req, res, next) => {
  const {name} = req.body;

  User.findOne({ name: name })
  .then(user => {
    if (user) {
      res.send({ data: `Пользователь с именем (${name}) - уже существует`})
      return;
    }
    next();
  })
  .catch(err => res.send({ data: null }));
};

/**
 *
Работа с документами:
  создать (create),
  прочитать (read),
  обновить (update),
  удалить (delete).
*/

const getUsers = (req, res, next) => {
  // ...
};

const createUser = (req, res, next) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const updateUserProfile = (req, res, next) => {
  // ...
};

module.exports = {
  doesUserExist,
  getUsers,
  createUser,
  updateUserProfile
};