// Importar dependencias
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const bookRoutes = require('./src/routes/bookRoutes');
const authorRoutes = require('./src/routes/authorRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

// Inicializar app Express
const app = express();
app.use(express.json()); // Parsear JSON

// Rutas
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/users', userRoutes);

// Manejo errores global
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));