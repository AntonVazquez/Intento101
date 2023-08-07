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
    const recipes = await Recipe.find().populate('ingredients.ingredient');
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
exports.createRecipe = (req, res, next) => {
  const recipeData = req.body;
  recipeData.author = req.user._id;  // Aquí se establece el campo autor

  Recipe.create(recipeData)
      .then(recipe => res.status(201).json(recipe))
      .catch(err => next(err));
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
exports.searchRecipes = (req, res) => {
  let title = req.query.title;
  if (title.length > 20) title = title.substr(0, 20);

  Recipe.find({ title: { $regex: title, $options: 'i' } }) 
      .limit(10) 
      .exec()
      .then(recipes => {
          return res.status(200).json(recipes);
      })
      .catch(err => {
          console.log(err);
          return res.status(500).json({ error: 'Error searching for recipes' });
      });
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

exports.compareRecipePrices = async (req, res) => {
  try {
    // Obtener la receta
    const recipe = await Recipe.findById(req.params.id).populate('ingredients.ingredient');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Objeto para guardar el costo total de los ingredientes en cada supermercado
    const supermarketCosts = {};

    // Recorrer cada ingrediente y calcular el costo en cada supermercado
    recipe.ingredients.forEach(recipeIngredient => {
      const ingredient = recipeIngredient.ingredient;
      const requiredQuantity = recipeIngredient.amount;

      ingredient.supermarkets.forEach(supermarket => {
        if (!supermarketCosts[supermarket.name]) {
          supermarketCosts[supermarket.name] = 0;
        }

        const totalCost = Math.ceil(requiredQuantity / supermarket.quantity) * supermarket.price;
        supermarketCosts[supermarket.name] += totalCost;
      });
    });

    // Preparar los datos en el formato esperado por la vista
    const items = [
      {
        name: recipe.title,
        ingredients: recipe.ingredients.map(ingredient => ({
          name: ingredient.ingredient.name,
          supermarketPrices: ingredient.ingredient.supermarkets.map(supermarket => ({
            supermarket: supermarket.name,
            price: Math.ceil(ingredient.amount / supermarket.quantity) * supermarket.price,
          })),
        })),
        total: supermarketCosts,
      },
    ];

    // Renderizar la vista con los datos
    res.render('ComparePrices', { items, grandTotal: supermarketCosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



