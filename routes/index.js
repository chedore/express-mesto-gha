const router = require('express').Router();
const userRouters = require('./users');
const cardRouters = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/index');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/sigin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Неверно введена ссылка'));
});

module.exports = router;
