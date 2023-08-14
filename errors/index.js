// https://docs.python.org/3/library/http.html
// eslint-disable-next-line max-classes-per-file
const OK = 200;
const CREATED = 201;
// eslint-disable-next-line max-len
const BAD_REQUEST = 400; // переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
const UNAUTHORIZED = 401; // неверный логин-пароль. неверный jWT
const FORBIDDEN = 403; // попытка удалить чужую карточку
const NOT_FOUND = 404; // карточка или пользователь не найден.
const CONFLICT = 409; // при регистрации указан email, который уже существует на сервере
const DEFAULT_ERROR = 500; // ошибка по-умолчанию.

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

class BadUnAutorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

class ForbbidenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

class ValidateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  DEFAULT_ERROR,
  CONFLICT,

  NotFoundError,
  BadRequestError,
  BadUnAutorized,
  ForbbidenError,
  ValidateError,
};
