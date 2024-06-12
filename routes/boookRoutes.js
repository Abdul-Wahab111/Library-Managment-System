const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - publicationYear
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         borrowed:
 *           type: boolean
 *           description: The borrowed status of the book
 *         publicationYear:
 *           type: integer
 *           description: The publication year of the book
 *       example:
 *         id: 1
 *         title: 'Sample Book'
 *         author: 'Author Name'
 *         genre: 'Fiction'
 *         borrowed: false
 *         publicationYear: 2020
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management API
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', bookController.getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post('/books', bookController.addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update the book by the id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Some error happened
 */
router.put('/books/:id', bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Some error happened
 */
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
