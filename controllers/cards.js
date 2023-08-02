const Card = require('../models/card');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  DEFAULT_ERROR,

  NotFoundError,
} = require('../errors/index');

/* ----мидлвэр---- */

// Проверим, существует ли карточка по идентификатору:
const doesCardIdExist = (req, res, next) => {
  // const { _id } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then(() => {
      next();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

//-------------------
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(OK).send(card))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const deleteCardByID = (req, res) => {
  // перед deleteCardByID проверяется мидлвэр doesCardIdExist
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const putCardLike = (req, res) => {
  // перед putCardLike проверяется мидлвэр doesCardIdExist
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const deleteCardLike = (req, res) => {
  // перед deleteCardLike проверяется мидлвэр doesCardIdExist
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

module.exports = {
  doesCardIdExist,

  createCard,
  getCards,
  deleteCardByID,
  putCardLike,
  deleteCardLike,
};
