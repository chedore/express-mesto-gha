const router = require("express").Router();
const {
  doesCardIdExist,

  createCard,
  getCards,
  deleteCardByID,
  putCardLike,
  deleteCardLike
} = require("../controllers/cards");

//создаём карточки
router.post("/", createCard);

//возвращаем все карточки
router.get("/", getCards);

// удаляет карточку по идентификатору
router.delete("/:cardId", doesCardIdExist, deleteCardByID);

// поставить лайк карточке
router.put("/:cardId/likes", doesCardIdExist, putCardLike);

// убрать лайк с карточки
router.delete("/:cardId/likes", doesCardIdExist, deleteCardLike);

module.exports = router;