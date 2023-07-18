const Recipe = require('../models/recipe');

// Autenticación de usuario
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You need to log in to access this resource' });
};

// Guardar una receta en el perfil del usuario
exports.saveRecipe = async (req, res) => {
  try {
    // Aquí va tu lógica para guardar la receta en el perfil del usuario
    res.status(200).json({ message: 'Recipe saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quitar una receta guardada del perfil del usuario
exports.unsaveRecipe = async (req, res) => {
  try {
    // Aquí va tu lógica para quitar la receta del perfil del usuario
    res.status(200).json({ message: 'Recipe unsaved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Mostrar todas las recetas
exports.getAllRecipes = async () => {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Mostrar una receta específica
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva receta
exports.createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    recipe.owner = req.user._id;
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una receta específica
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrar una receta específica
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar recetas
exports.searchRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ name: { $regex: req.body.query, $options: 'i' } });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verificar el propietario de la receta
exports.verifyRecipeOwner = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comparar los precios de una receta en diferentes supermercados
exports.compareRecipePrices = async (req, res) => {
  try {
    // Obtener la receta
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Crear un objeto para guardar el costo total de los ingredientes en cada supermercado
    const supermarketCosts = {};

    // Calcular el costo total de los ingredientes en cada supermercado
    recipe.ingredients.forEach(ingredient => {
      ingredient.prices.forEach(priceInfo => {
        if (!supermarketCosts[priceInfo.supermarket]) {
          supermarketCosts[priceInfo.supermarket] = 0;
        }
        supermarketCosts[priceInfo.supermarket] += priceInfo.price;
      });
    });

    // Convertir el objeto de costos en un array y ordenarlo por costo
    const sortedCosts = Object.keys(supermarketCosts).map(supermarket => ({
      supermarket,
      cost: supermarketCosts[supermarket]
    })).sort((a, b) => a.cost - b.cost);

    res.status(200).json(sortedCosts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
