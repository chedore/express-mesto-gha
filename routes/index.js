const router = require('express').Router();
const userRouters = require('./users');
const cardRouters = require('./cards');
const { NOT_FOUND } = require('../errors/index');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/sigin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неверно введена ссылка' });
});

module.exports = router;
