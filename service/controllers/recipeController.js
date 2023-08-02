const Recipe = require('../models/recipe');
const User = require('../models/user');
const Ingredient = require('../models/ingredient');


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
      const user = await User.findById(req.user._id);
      user.savedRecipes.push(req.body.recipeId);
      await user.save();
      res.status(200).json({ message: 'Recipe saved' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Quitar una receta guardada del perfil del usuario
exports.unsaveRecipe = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      user.savedRecipes.pull(req.body.recipeId);
      await user.save();
      res.status(200).json({ message: 'Recipe unsaved' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Función para obtener todas las recetas
exports.getAllRecipes = async () => {
  try {
    const recipes = await Recipe.find();
    return recipes;
  } catch (error) {
    console.error(error);
    return []; 
  }
};

// Función para renderizar la vista
exports.renderRecipes = async (req, res) => {
  try {
    const recipes = await exports.getAllRecipes();
    res.render('recipes', { recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Renderiza la vista para crear recetas
exports.showCreateRecipeForm = (req, res) => {
  res.render('CreateRecipe', { 
    messages: req.flash() // Asegurándonos de que los mensajes flash estén disponibles en la vista
  });
};



// Crear una nueva receta
exports.createRecipe = async (req, res) => {
  try {
    // Parse the ingredients from JSON
    const ingredientData = JSON.parse(req.body.ingredients);

    // Fetch the ingredient IDs
    const ingredients = await Promise.all(ingredientData.map(async ({ ingredient, amount }) => {
      // Search for the ingredient by name
      const ingredientDoc = await Ingredient.findOne({ name: ingredient });

      // If the ingredient doesn't exist, throw an error
      if (!ingredientDoc) throw new Error(`Ingredient not found: ${ingredient}`);

      // Return the ingredient ID and amount
      return { ingredient: ingredientDoc._id, amount };
    }));

    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      instructions: req.body.instructions,
      difficulty: req.body.difficulty,
      preparationTime: req.body.preparationTime,
      typeOfFood: req.body.typeOfFood,
      image: '/path/to/images/' + req.file.filename,
      ingredients: ingredients,
      author: req.user._id
    });

    await recipe.save();

    // Send a JSON response instead of redirect
    res.status(201).json({ message: 'Recipe created', id: recipe._id });

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
      const recipes = await Recipe.find({ title: { $regex: req.body.query, $options: 'i' } });
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
    const recipe = await Recipe.findById(req.params.id).populate('ingredients.ingredient');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Crear un objeto para guardar el costo total de los ingredientes en cada supermercado
    const supermarketCosts = {};

    // Calcular el costo total de los ingredientes en cada supermercado
    for (let recipeIngredient of recipe.ingredients) {
      const ingredient = recipeIngredient.ingredient;
      const requiredQuantity = recipeIngredient.amount;

      for (let supermarket of ingredient.supermarkets) {
        // Comprobar si este supermercado ya ha sido añadido al objeto de costos
        if (!supermarketCosts[supermarket.name]) {
          supermarketCosts[supermarket.name] = 0;
        }

        // Calcular el costo en este supermercado
        const totalPackages = Math.ceil(requiredQuantity / supermarket.quantity);
        const totalCost = totalPackages * supermarket.price;
        supermarketCosts[supermarket.name] += totalCost;
      }
    }

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


