const router = require('express').Router();
const userRouters = require('./users');
const cardRouters = require('./cards');
const { NOT_FOUND } = require('../errors/index');

router.use('/users', userRouters);
router.use('/cards', cardRouters);

router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Неверно введена ссылка' });
});

module.exports = router;
