const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

router.post('/ingredients', ingredientController.createIngredient);

router.post('/bulk', ingredientController.createMultipleIngredients);

router.get('/all', ingredientController.getAll);

router.get('/search', ingredientController.searchIngredients);


module.exports = router;
