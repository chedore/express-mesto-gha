const Card = require("../models/card");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,

  NotFoundError,
  BadRequestError,
} = require("../errors/index");

/* ----мидлвэр---- */

// Проверим, существует ли карточка по идентификатору:
const doesCardIdExist = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card) {
        // if (card.owner.toString() !== _id) {
        //   throw new BadRequestError(`Нельзя удалить чужую карточку`);
        // }
        next();
        return;
      }
      throw new NotFoundError(`Карточка не найдена`);
    })
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

//-------------------
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  console.log(req.body);

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(OK).send(card))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const deleteCardByID = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const putCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId,  { $addToSet: { likes: _id } })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const deleteCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId,  { $pull: { likes: _id } })
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
