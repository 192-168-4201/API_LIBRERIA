// Controladores para Libros (CRUD con auth)
const Book = require('../models/Book');
const asyncHandler = require('express-async-handler'); // Manejo async errores (instala si falta: npm i express-async-handler)

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).populate('author'); // Populate autor
  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (book) res.json(book);
  else res.status(404).json({ message: 'Libro no encontrado' });
});

const createBook = asyncHandler(async (req, res) => {
  const { title, author, year, genre } = req.body;
  const book = new Book({ title, author, year, genre, user: req.user._id }); // Asociar a usuario logueado
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = req.body.title || book.title;
    // Actualizar otros campos...
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else res.status(404).json({ message: 'Libro no encontrado' });
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json({ message: 'Libro eliminado' });
  } else res.status(404).json({ message: 'Libro no encontrado' });
});

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };