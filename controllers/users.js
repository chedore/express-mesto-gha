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
        throw new BadRequestError(`Пользователь уже существует`);
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
      if (user) {
        next();
        return;
      }
      throw new NotFoundError(`Пользователь не найдена`);
    })
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

//-------------------
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const getUserByID = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId).then((user) => res.status(OK).send({ data: user }));
};

const updateUserProfile = (req, res, next) => {
  const { userId } = req.params;
};

module.exports = {
  doesUserExist,
  doesUserIdExist,
  getUsers,
  createUser,
  getUserByID,
  updateUserProfile,
};
