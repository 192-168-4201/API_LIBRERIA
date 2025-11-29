// Controladores para Usuarios
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) res.json(user);
  else res.status(404).json({ message: 'Usuario no encontrado' });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email
    });
  } else res.status(404).json({ message: 'Usuario no encontrado' });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Usuario eliminado' });
  } else res.status(404).json({ message: 'Usuario no encontrado' });
});

module.exports = { getUsers, getUserById, updateUser, deleteUser };