const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Mostrar todas las recetas
router.get('/', recipeController.getAllRecipes);

// Mostrar una receta específica
router.get('/:id', recipeController.getRecipe);

// Crear una nueva receta
router.post('/', recipeController.ensureAuthenticated, recipeController.createRecipe);

// Actualizar una receta específica
router.put('/:id', recipeController.ensureAuthenticated, recipeController.verifyRecipeOwner, recipeController.updateRecipe);

// Borrar una receta específica
router.delete('/:id', recipeController.ensureAuthenticated, recipeController.verifyRecipeOwner, recipeController.deleteRecipe);

// Buscar recetas
router.post('/search', recipeController.searchRecipes);

// Guardar una receta en el perfil del usuario
router.post('/:id/save', recipeController.ensureAuthenticated, recipeController.saveRecipe);

// Quitar una receta guardada del perfil del usuario
router.post('/:id/unsave', recipeController.ensureAuthenticated, recipeController.unsaveRecipe);

module.exports = router;
