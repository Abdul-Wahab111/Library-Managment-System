// models/userModel.js
const { sql, poolPromise } = require('../utils/database');

class User {
  static async getAllUsers() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM Users');
      return result.recordset;
    } catch (err) {
      throw err;
    }
  }

  static async addUser(user) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Name', sql.NVarChar, user.name)
        .input('Email', sql.NVarChar, user.email)
        .input('ContactNumber', sql.NVarChar, user.contactNumber)
        .query('INSERT INTO Users (Name, Email, ContactNumber) VALUES (@Name, @Email, @ContactNumber)');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(id, user) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .input('Name', sql.NVarChar, user.name)
        .input('Email', sql.NVarChar, user.email)
        .input('ContactNumber', sql.NVarChar, user.contactNumber)
        .query('UPDATE Users SET Name = @Name, Email = @Email, ContactNumber = @ContactNumber WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('DELETE FROM Users WHERE ID = @ID');
      return result.rowsAffected;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
