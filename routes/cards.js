const router = require('express').Router();
const {
  doesCardIdExist,

  createCard,
  getCards,
  deleteCardByID,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const {
  validateCreateCard,
  validatCardId,
} = require('../middlewares/validation');

// создаём карточки
router.post('/', validateCreateCard, createCard);

// возвращаем все карточки
router.get('/', getCards);

// удаляет карточку по идентификатору
router.delete('/:cardId', validatCardId, doesCardIdExist, deleteCardByID);

// поставить лайк карточке
router.put('/:cardId/likes', validatCardId, doesCardIdExist, putCardLike);

// убрать лайк с карточки
router.delete('/:cardId/likes', validatCardId, doesCardIdExist, deleteCardLike);

module.exports = router;
