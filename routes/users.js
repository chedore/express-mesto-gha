const router = require("express").Router();

const {
  doesUserExist,
  getUsers,
  createUser,
  updateUserProfile,
} = require("../controllers/users");

// router.patch("/users/:id", updateUserProfile);
router.post("/", doesUserExist);
router.post("/", createUser);
// router.get("/users", getUsers);


const User = require('../models/user');

module.exports = router;
