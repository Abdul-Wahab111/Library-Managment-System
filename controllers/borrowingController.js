// controllers/borrowingController.js
const Borrowing = require('../models/borrowingModel');

exports.borrowBook = async (req, res) => {
  try {
    const borrowing = req.body;
    const rowsAffected = await Borrowing.borrowBook(borrowing);
    res.status(201).send(`Book borrowed with ${rowsAffected} row(s) affected.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.returnBook = async (req, res) => {
  try {
    const borrowingID = req.params.id;
    const rowsAffected = await Borrowing.returnBook(borrowingID);
    res.status(200).send(`Book returned with ${rowsAffected} row(s) affected.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getBorrowedBooksByUser = async (req, res) => {
  try {
    const userID = req.params.userID;
    const borrowedBooks = await Borrowing.getBorrowedBooksByUser(userID);
    res.json(borrowedBooks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
