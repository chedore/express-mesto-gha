const router = require("express").Router();
const {
  doesCardIdExist,

  createCard,
  getCards,
  deleteCardByID
} = require("../controllers/cards");

//создаём карточки
router.post("/", createCard);

//возвращаем все карточки
router.get("/", getCards);

// удаляет карточку по идентификатору
router.delete("/:cardId", doesCardIdExist, deleteCardByID);

module.exports = router;