const express = require('express');
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(getAuthors).post(protect, createAuthor);
router.route('/:id').get(getAuthorById).put(protect, updateAuthor).delete(protect, deleteAuthor);

module.exports = router;