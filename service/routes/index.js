const express = require('express');
const router = express.Router();

// Importa los routers de los distintos componentes
const adminRoutes = require('./adminRoutes');
const menuRoutes = require('./menuRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

// Asigna los routers a sus respectivas rutas
router.use('/admin', adminRoutes);
router.use('/menus', menuRoutes);
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;
