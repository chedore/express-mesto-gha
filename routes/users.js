const router = require("express").Router();

const {
  getUsers,
  createUser,
  updateUserProfile,
} = require("../controllers/users");

router.patch("/users/:id", updateUserProfile);
router.post("/users", createUser);
router.get("/users", getUsers);

module.exports = router;
