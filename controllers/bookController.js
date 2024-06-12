const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while fetching books.' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const newBook = req.body;
    if (!newBook.title || !newBook.author || !newBook.genre || !newBook.publicationYear) {
      return res.status(400).send({ error: 'Missing required fields' });
    }
    const result = await Book.addBook(newBook);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while adding the book.' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookID = req.params.id;
    const updatedBook = req.body;
    const result = await Book.updateBook(bookID, updatedBook);
    if (result[0] === 0) {
      return res.status(404).send({ error: 'Book not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while updating the book.' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookID = req.params.id;
    const result = await Book.deleteBook(bookID);
    if (result[0] === 0) {
      return res.status(404).send({ error: 'Book not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while deleting the book.' });
  }
};
