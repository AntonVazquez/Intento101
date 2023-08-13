const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController');
const recipeController = require('../controllers/recipeController');
const menuController = require('../controllers/menuController');

// Mostrar la página de administración
router.get('/', adminController.showAdminPage);

// Obtener todos los usuarios
router.get('/users', adminController.getUsers);

// Obtener un usuario en particular
router.get('/users/:id', adminController.getUser);

// Eliminar un usuario
router.delete('/users/:id', adminController.deleteUser);

// Editar un usuario
router.put('/users/:id', adminController.editUser);

// Obtener todas las recetas
router.get('/recipes', adminController.getRecipes);

// Obtener una receta en particular
router.get('/recipes/:id', adminController.getRecipe);

// Eliminar una receta
router.delete('/recipes/:id', adminController.deleteRecipe);

// Editar una receta
router.put('/recipes/:id', adminController.editRecipe);

// Obtener todos los menús
router.get('/menus', adminController.getMenus);

// Obtener un menú en particular
router.get('/menus/:id', adminController.getMenu);

// Eliminar un menú
router.delete('/menus/:id', adminController.deleteMenu);

// Editar un menú
router.put('/menus/:id', adminController.editMenu);

// Mostrar la página de gestión de recetas
router.get('/manageRecipes', recipeController.manage);

// Mostrar la página de gestión de recetas
router.get('/manageMenus', menuController.manage);


module.exports = router;