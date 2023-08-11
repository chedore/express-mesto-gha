// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED,
} = require('../errors/index');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация'});
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
};

module.exports = auth;
