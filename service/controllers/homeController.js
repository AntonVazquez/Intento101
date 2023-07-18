
const getAllRecipes = require('./recipeController').getAllRecipes;
const getAllMenus = require('./menuController').getAllMenus;

exports.getHome = async (req, res) => {
    try {
      // Utiliza los métodos importados directamente
      const recipes = await getAllRecipes();
      const menus = await getAllMenus();
  
      res.render('home', { recipes: recipes, menus: menus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

