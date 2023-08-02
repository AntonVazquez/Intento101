const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Mostrar el formulario para crear una nueva receta
router.get('/crear', recipeController.ensureAuthenticated, recipeController.showCreateRecipeForm);

// Mostrar pagina todas las recetas
router.get('/', recipeController.renderRecipes);

// Mostrar una receta específica
router.get('/:id', recipeController.getRecipe);

// Crear una nueva receta
router.post('/crearp', recipeController.ensureAuthenticated, recipeController.createRecipe);

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

// Comparar los precios de una receta en diferentes supermercados
router.get('/:id/comparePrices', recipeController.compareRecipePrices);

module.exports = router;
