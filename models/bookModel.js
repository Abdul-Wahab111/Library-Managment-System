// models/bookModel.js
const { sql, poolPromise } = require('../utils/database');

class Book {
  static async getAllBooks() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Books');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async addBook(book) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Title', sql.NVarChar, book.title)
        .input('Author', sql.NVarChar, book.author)
        .input('Genre', sql.NVarChar, book.genre)
        .input('PublicationYear', sql.Int, book.publicationYear)
        .query('INSERT INTO Books (Title, Author, Genre, PublicationYear) VALUES (@Title, @Author, @Genre, @PublicationYear)');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async updateBook(id, book) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('Title', sql.NVarChar, book.title)
        .input('Author', sql.NVarChar, book.author)
        .input('Genre', sql.NVarChar, book.genre)
        .input('PublicationYear', sql.Int, book.publicationYear)
        .query('UPDATE Books SET Title = @Title, Author = @Author, Genre = @Genre, PublicationYear = @PublicationYear WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async deleteBook(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('DELETE FROM Books WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Book;
