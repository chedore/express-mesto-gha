const Card = require('../models/card');
const {
  OK,
  CREATED,

  NotFoundError,
  ForbbidenError,
  ValidateError,
} = require('../errors/index');

/* ----мидлвэр---- */

// Проверим, существует ли карточка по идентификатору:
const doesCardIdExist = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(next(new NotFoundError('Карточка не найдена')))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidateError(err.message));
      }
      next(err.message);
    });
};

//-------------------
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidateError(err.message));
      }
      next(err.message);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(OK).send(card))
    .catch((err) => next(err.message));
};

const deleteCardByID = (req, res, next) => {
  // перед deleteCardByID проверяется мидлвэр doesCardIdExist
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card.owner.toString() === _id) {
        card.deleteOne(card)
          .then(() => res.send({ data: card }))
          .catch(next);
      } else next(new ForbbidenError('Чужую карточку нельзя удалить'));
    })
    .catch((err) => next(err.message));
};

const putCardLike = (req, res, next) => {
  // перед putCardLike проверяется мидлвэр doesCardIdExist
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => next(err.message));
};

const deleteCardLike = (req, res, next) => {
  // перед deleteCardLike проверяется мидлвэр doesCardIdExist
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => next(err.message));
};

module.exports = {
  doesCardIdExist,

  createCard,
  getCards,
  deleteCardByID,
  putCardLike,
  deleteCardLike,
};
