// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const {
  BadUnAutorized,
} = require('../errors/index');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   next(new BadUnAutorized('Необходима авторизация'));
  //   return;
  // }

  // const token = authorization.replace('Bearer ', '');

  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    next(new BadUnAutorized('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new BadUnAutorized('Необходима авторизация'));
    return;
  }
  req.user = payload;

  next();
};

module.exports = auth;
