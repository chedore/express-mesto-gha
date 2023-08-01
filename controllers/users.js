const User = require("../models/user");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,

  NotFoundError,
  BadRequestError,
} = require("../errors/index");

/* ----мидлвэр---- */
// Проверим, существует ли пользователь:
const doesUserExist = (req, res, next) => {
  const { name } = req.body;

  User.findOne({ name: name })
    .then((user) => {
      if (user) {
        throw new BadRequestError(
          `Пользователь с именем (${name}) - уже существует`
        );
        return;
      }
      next();
    })
    .catch((err) => res.status(err.statusCode).send({ message: err.message }));
};

// Проверим, существует ли пользователь:
const doesUserIdExist = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          `Пользователь с id (${userId}) - не существует`
        );
        return;
      }
      next();
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(NOT_FOUND)
          .send({ message: `Пользователь с id (${userId}) - не существует` });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

/**
 *
Работа с документами:
  создать (create),
  прочитать (read),
*/

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" }));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: "Произошла ошибка" }));
};

const getUserByID = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId).then((user) => res.status(OK).send({ data: user }));
};

module.exports = {
  doesUserExist,
  doesUserIdExist,
  getUsers,
  createUser,
  getUserByID,
};
