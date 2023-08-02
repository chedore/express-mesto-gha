const User = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,

  NotFoundError,
} = require('../errors/index');

/* ----мидлвэр---- */
// Проверим, существует ли пользователь:
const doesUserIdExist = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

// Проверим, существует ли наш рользователь:
const doesMeExist = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

//-------------------
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const getUserByID = (req, res) => {
  // перед getUserByID проверяется мидлвэр doesUserIdExist
  const { userId } = req.params;

  User.findById(userId).then((user) => res.status(OK).send({ data: user }));
};

const updateUserProfile = (req, res) => {
  // перед updateUserProfile проверяется мидлвэр doesMeExist
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  // перед updateUserAvatar проверяется мидлвэр doesMeExist
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

module.exports = {
  doesUserIdExist,
  doesMeExist,

  getUsers,
  createUser,
  getUserByID,
  updateUserProfile,
  updateUserAvatar,
};
