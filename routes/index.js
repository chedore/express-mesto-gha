const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const userRouters = require('./users');
const cardRouters = require('./cards');
const { NOT_FOUND } = require('../errors/index');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { DEFAULT_ERROR } = require('../errors/index');
const {
  validateLogin,
  validateCreateUser,
} = require('../middlewares/validation');

router.post('/sigin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неверно введена ссылка' });
});

// обработчик ошибок celebrate
router.use(errors());

// централизованный обработчик
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
});

module.exports = router;
