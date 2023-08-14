/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */

const bcrypt = require('bcryptjs');
const User = require('../models/user');
// eslint-disable-next-line import/order
const jwt = require('jsonwebtoken');
const {
  OK,
  CREATED,
  CONFLICT,

  NotFoundError,
  ValidateError,
  BadUnAutorized,
} = require('../errors/index');

/* ----мидлвэр---- */
// Проверим, существует ли пользователь:
const doesUserIdExist = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(next(new NotFoundError('Пользователь не найден')))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err.message);
    });
};

// Проверим, существует ли наш рользователь:
const doesMeExist = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(next(new NotFoundError('Пользователь не найден')))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err.message);
    });
};

//-------------------
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => next(err.message));
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    // eslint-disable-next-line max-len
    .then((user) => res.status(CREATED).send({ _id: user._id, email: user.email, name: user.name, about: user.about, avatar: user.avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      } if (err.code === 11000) {
        res.status(CONFLICT).send({ message: 'Данный email уже существует' });
        return;
      }
      next(err.message);
    });
};

const getUserByID = (req, res) => {
  // перед getUserByID проверяется мидлвэр doesUserIdExist
  const { userId } = req.params;

  User.findById(userId).then((user) => res.status(OK).send({ data: user }));
};

const getUserProfile = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => res.status(OK).send(user))
    .catch((err) => next(err.message));
};

const updateUserProfile = (req, res, next) => {
  // перед updateUserProfile проверяется мидлвэр doesMeExist
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err.message);
    });
};

const updateUserAvatar = (req, res, next) => {
  // перед updateUserAvatar проверяется мидлвэр doesMeExist
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
        return;
      }
      next(err.message);
    });
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
//       res.status(OK).send({ token });
//     })
//     .catch((err) => {
//       next(new BadUnAutorized(err.message));
//     });
// };

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new BadUnAutorized('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
            res.cookie('jwt', token, { httpOnly: true, secure: true });
            res.status(OK).send({ token });
          } else {
            throw new BadUnAutorized('Пользователь не найден');
          }
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  doesUserIdExist,
  doesMeExist,

  getUsers,
  createUser,
  getUserByID,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  login,
};
