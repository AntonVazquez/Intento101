const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Mostrar el dashboard del administrador
router.get('/dashboard', adminController.ensureAdmin, adminController.showDashboard);

// Mostrar todos los usuarios
router.get('/users', adminController.ensureAdmin, adminController.showUsers);

// Mostrar todas las recetas
router.get('/recipes', adminController.ensureAdmin, adminController.showRecipes);

// Mostrar todos los menús
router.get('/menus', adminController.ensureAdmin, adminController.showMenus);

// Gestionar usuarios (activar, desactivar, eliminar)
router.post('/users/manage', adminController.ensureAdmin, adminController.manageUsers);

// Gestionar recetas (aprobar, rechazar, eliminar)
router.post('/recipes/manage', adminController.ensureAdmin, adminController.manageRecipes);

// Gestionar menús (aprobar, rechazar, eliminar)
router.post('/menus/manage', adminController.ensureAdmin, adminController.manageMenus);

module.exports = router;
