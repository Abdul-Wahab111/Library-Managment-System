// controllers/userController.js
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addUser = async (req, res) => {
  try {
    const newUser = req.body;
    const rowsAffected = await User.addUser(newUser);
    res.status(201).send(`User added with ${rowsAffected} row(s) affected.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const rowsAffected = await User.updateUser(id, updatedUser);
    res.status(200).send(`User updated with ${rowsAffected} row(s) affected.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const rowsAffected = await User.deleteUser(id);
    res.status(200).send(`User deleted with ${rowsAffected} row(s) affected.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
