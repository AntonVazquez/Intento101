const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Mostrar el formulario de registro
router.get('/register', userController.showRegisterForm);

// Registro de un nuevo usuario
router.post('/register', userController.registerUser);

// Mostrar el formulario de login
router.get('/login', userController.showLoginForm);

// Autenticación del usuario
router.post('/login', userController.loginUser);

// Cerrar sesión
router.get('/logout', userController.logout);

// Mostrar el perfil del usuario
router.get('/profile', userController.ensureAuthenticated, userController.showProfile);

// Actualizar el perfil del usuario
router.post('/profile', userController.ensureAuthenticated, userController.updateProfile);

// Mostrar las recetas del usuario
router.get('/recipes', userController.ensureAuthenticated, userController.showRecipes);

// Mostrar los menús creados por el usuario
router.get('/menus/created', userController.ensureAuthenticated, userController.showCreatedMenus);

// Mostrar los menús guardados por el usuario
router.get('/menus/saved', userController.ensureAuthenticated, userController.showSavedMenus);

// Guardar una receta en el perfil del usuario
router.post('/recipes/:id/save', userController.ensureAuthenticated, userController.saveRecipe);

// Quitar una receta guardada del perfil del usuario
router.delete('/recipes/:id/unsave', userController.ensureAuthenticated, userController.unsaveRecipe);

// Ruta para mostrar el formulario de actualización a premium (si quieres usar un formulario)
router.get('/upgrade', userController.ensureAuthenticated, userController.showUpgradeForm);

// Ruta para manejar la actualización a premium
router.post('/upgrade', userController.ensureAuthenticated, userController.upgradeToPremium);

module.exports = router;

