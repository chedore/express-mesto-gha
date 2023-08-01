// https://docs.python.org/3/library/http.html
const OK = 200;
const BAD_REQUEST = 400; // переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
const NOT_FOUND = 404; // карточка или пользователь не найден.
const DEFAULT_ERROR = 500; // ошибка по-умолчанию.

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,

  NotFoundError,
  BadRequestError,
};
