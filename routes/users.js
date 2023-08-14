const router = require('express').Router();
const {
  validateUserId,
  validateUserProfile,
  validateUserAvatar,
} = require('../middlewares/validation');

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
router.patch('/me', validateUserProfile, doesMeExist, updateUserProfile);

// возвращает пользователя по идентификатору
router.get('/:userId', validateUserId, doesUserIdExist, getUserByID);

// обновляет аватар
router.patch('/me/avatar', validateUserAvatar, doesMeExist, updateUserAvatar);

module.exports = router;
