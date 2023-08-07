const Menu = require('../models/menu');
const Recipe = require('../models/recipe');
const User = require('../models/user');

// Autenticación de usuario
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You need to log in to access this resource' });
};

// Guardar un menú en el perfil del usuario
exports.saveMenu = async (req, res) => {
  try {
    // Aquí va tu lógica para guardar el menú en el perfil del usuario
    res.status(200).json({ message: 'Menu saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quitar un menú guardado del perfil del usuario
exports.unsaveMenu = async (req, res) => {
  try {
    // Aquí va tu lógica para quitar el menú del perfil del usuario
    res.status(200).json({ message: 'Menu unsaved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Función para obtener todos los menús
exports.getAllMenus = async () => {
  try {
    // Aquí se está usando populate para incluir los detalles de las recetas
    const menus = await Menu.find().populate('recipes');
    return menus;
  } catch (error) {
    console.error(error);
    return [];
  }
};


// Función para renderizar la vista
exports.renderMenus = async (req, res) => {
  try {
    const menus = await exports.getAllMenus();
    res.render('menus', { menus }); // Asegúrate de que 'menus' es la vista correcta
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.showCreateMenuForm = (req, res) => {
  res.render('CreateMenu', { 
    messages: req.flash() // Asegurándonos de que los mensajes flash estén disponibles en la vista
  });
};


// Mostrar un menú específico
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

// Crear un nuevo menú
exports.createMenu = (req, res, next) => {
  const menuData = req.body;
  menuData.user = req.user._id;  // Aquí se establece el campo usuario

  Menu.create(menuData)
      .then(menu => res.status(201).json(menu))
      .catch(err => next(err));
};

// Actualizar un menú específico
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrar un menú específico
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json({ message: 'Menu deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verificar el propietario del menú
exports.verifyMenuOwner = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (menu.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.compareMenuPrices = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate({
      path: 'recipes',
      populate: {
        path: 'ingredients.ingredient'
      }
    });

    if (!menu) {
      return res.status(404).render('ComparaPrices', { items: [] });
    }

    const items = [];
    let grandTotal = {};

    for (let recipe of menu.recipes) {
      const recipeItem = {
        name: recipe.title,
        ingredients: [],
        total: {}
      };

      for (let recipeIngredient of recipe.ingredients) {
        const ingredient = recipeIngredient.ingredient;
        const requiredQuantity = recipeIngredient.amount;
        let supermarkets = {};

        for (let supermarket of ingredient.supermarkets) {
          if (!(supermarket.name in supermarkets)) {
            supermarkets[supermarket.name] = 0;
          }
          const totalCost = Math.ceil(requiredQuantity / supermarket.quantity) * supermarket.price;
          supermarkets[supermarket.name] += totalCost;

          // Agregar al total de la receta
          recipeItem.total[supermarket.name] = (recipeItem.total[supermarket.name] || 0) + supermarkets[supermarket.name];

          // Agregar al total general
          grandTotal[supermarket.name] = (grandTotal[supermarket.name] || 0) + supermarkets[supermarket.name];
        }

        recipeItem.ingredients.push({
          name: ingredient.name,
          supermarketPrices: Object.keys(supermarkets).map(supermarket => ({
            supermarket,
            price: supermarkets[supermarket],
          })),
        });
      }

      items.push(recipeItem);
    }

    res.render('ComparePrices', { items, grandTotal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
