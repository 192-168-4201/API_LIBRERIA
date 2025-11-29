// Rutas Libros con auth
const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(getBooks).post(protect, createBook);
router.route('/:id').get(getBookById).put(protect, updateBook).delete(protect, deleteBook);

module.exports = router;