const User = require('../models/user');
const Recipe = require('../models/recipe');
const Menu = require('../models/menu');

// Mostrar pagina administrador
exports.showAdminPage = (req, res) => {
  res.render('admin');
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('manageUsers', { users }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Eliminar el usuario usando findByIdAndDelete
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Eliminar la receta usando findByIdAndDelete
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Eliminar el menú usando findByIdAndDelete
    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Menu deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.editUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.editRecipe = async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.editMenu = async (req, res) => {
    try {
      const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedMenu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      res.status(200).json(updatedMenu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  
