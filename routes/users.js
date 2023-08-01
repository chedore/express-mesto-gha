const router = require("express").Router();

const {
  doesUserExist,
  doesUserIdExist,
  getUsers,
  createUser,
  getUserByID,
} = require("../controllers/users");


//создаём пользователя
router.post("/", doesUserExist);
router.post("/", createUser);

//возвращаем всех пользователя
router.get("/", getUsers);

// возвращает пользователя по id
router.get("/:userId", doesUserIdExist);
router.get("/:userId", getUserByID);

const User = require('../models/user');

module.exports = router;
