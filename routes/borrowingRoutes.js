// routes/borrowingRoutes.js
const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

router.post('/borrow', borrowingController.borrowBook);
router.post('/return/:id', borrowingController.returnBook);
router.get('/borrowedBooks/:userID', borrowingController.getBorrowedBooksByUser);

module.exports = router;
