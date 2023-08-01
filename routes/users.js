const router = require("express").Router();

const {
  doesUserExist,
  doesUserIdExist,
  getUsers,
  createUser,
  getUserByID,
} = require("../controllers/users");

//создаём пользователя
router.post("/", doesUserExist, createUser);

//возвращаем всех пользователя
router.get("/", getUsers);

// возвращает пользователя по идентификатору
router.get("/:userId", doesUserIdExist, getUserByID);

module.exports = router;
