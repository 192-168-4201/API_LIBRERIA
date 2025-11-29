const Author = require('../models/Author');
const asyncHandler = require('express-async-handler');

const getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find({});
  res.json(authors);
});

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) res.json(author);
  else res.status(404).json({ message: 'Autor no encontrado' });
});

const createAuthor = asyncHandler(async (req, res) => {
  const { name, birthYear, nationality } = req.body;
  const author = new Author({ name, birthYear, nationality });
  const createdAuthor = await author.save();
  res.status(201).json(createdAuthor);
});

const updateAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    author.name = req.body.name || author.name;
    author.birthYear = req.body.birthYear || author.birthYear;
    author.nationality = req.body.nationality || author.nationality;
    const updatedAuthor = await author.save();
    res.json(updatedAuthor);
  } else res.status(404).json({ message: 'Autor no encontrado' });
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await author.remove();
    res.json({ message: 'Autor eliminado' });
  } else res.status(404).json({ message: 'Autor no encontrado' });
});

module.exports = { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };