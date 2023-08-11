const router = require('express').Router();

const {
  doesUserIdExist,
  doesMeExist,
  getUsers,
  getUserByID,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// возвращаем всех пользователя
router.get('/', getUsers);

// возвращает пользователя по идентификатору
router.get('/:userId', doesUserIdExist, getUserByID);

// обновляет профиль
router.patch('/me', doesMeExist, updateUserProfile);

// обновляет аватар
router.patch('/me/avatar', doesMeExist, updateUserAvatar);

module.exports = router;
