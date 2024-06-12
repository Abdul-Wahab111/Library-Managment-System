// models/borrowingModel.js
const { sql, poolPromise } = require('../utils/database');

class Borrowing {
  static async borrowBook(borrowing) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('UserID', sql.Int, borrowing.userID)
        .input('BookID', sql.Int, borrowing.bookID)
        .input('BorrowedDate', sql.Date, borrowing.borrowedDate)
        .query('INSERT INTO Borrowings (UserID, BookID, BorrowedDate) VALUES (@UserID, @BookID, @BorrowedDate)');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async returnBook(borrowingID) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('BorrowingID', sql.Int, borrowingID)
        .input('ReturnedDate', sql.Date, new Date())
        .query('UPDATE Borrowings SET ReturnedDate = @ReturnedDate WHERE BorrowingID = @BorrowingID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async getBorrowedBooksByUser(userID) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('UserID', sql.Int, userID)
        .query('SELECT * FROM Borrowings WHERE UserID = @UserID AND ReturnedDate IS NULL');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Borrowing;
