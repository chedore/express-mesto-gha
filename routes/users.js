const router = require('express').Router();

const {
  doesUserIdExist,
  doesMeExist,
  getUsers,
  getUserByID,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// возвращаем всех пользователя
router.get('/', getUsers);

// возвращаем информацию о профиль
router.get('/me', doesMeExist, getUserProfile);
// обновляет профиль
router.patch('/me', doesMeExist, updateUserProfile);

// возвращает пользователя по идентификатору
router.get('/:userId', doesUserIdExist, getUserByID);

// обновляет аватар
router.patch('/me/avatar', doesMeExist, updateUserAvatar);

module.exports = router;
