// Modelo Libro con Mongoose
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  year: { type: Number, required: true },
  genre: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Relación usuario (dueño)
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);