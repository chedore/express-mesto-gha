const router = require('express').Router();

const {
  doesUserIdExist,
  doesMeExist,
  getUsers,
  createUser,
  getUserByID,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// создаём пользователя
router.post('/', createUser);

// возвращаем всех пользователя
router.get('/', getUsers);

// возвращает пользователя по идентификатору
router.get('/:userId', doesUserIdExist, getUserByID);

// обновляет профиль
router.patch('/me', doesMeExist, updateUserProfile);

// обновляет аватар
router.patch('/me/avatar', doesMeExist, updateUserAvatar);

module.exports = router;
