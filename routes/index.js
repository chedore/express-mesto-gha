const router = require('express').Router();
const userRouters = require('./users');
const cardRouters = require('./cards');
const { createUser, login } = require('../controllers/users');
const { NotFoundError } = require('../errors/index');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/signup', validateCreateUser, createUser);
router.post('/sigin', validateLogin, login);

const auth = require('../middlewares/auth');

router.use(auth);

router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Неверно введена ссылка'));
});

module.exports = router;
