// Rutas Usuarios y Auth
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User routes (protegidas)
router.route('/')
  .get(protect, getUsers);

router.route('/:id')
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;