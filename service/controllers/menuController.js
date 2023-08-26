const Menu = require('../models/menu');
const Recipe = require('../models/recipe');
const User = require('../models/user');

// Autenticación de usuario
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Usando el sistema de mensajes flash para informar al usuario
  req.flash('warning', 'Necesitas iniciar sesión para acceder a este recurso.');
  
  // Redireccionando al usuario a /home
  res.redirect('/home');
};

// Guardar un menú en el perfil del usuario
exports.saveMenu = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const menuId = req.params.id;
    
    // Verificar si el menú ya está guardado
    if (user.savedMenus.includes(menuId)) {
      req.flash('warning', 'Menú ya guardado.');
      return res.redirect('/users/profile'); // Redireccionando a la página de perfil
    }
    
    user.savedMenus.push(menuId);
    await user.save();
    req.flash('success', 'Menú guardado con éxito.');
    res.redirect('/users/profile'); // Redireccionando a la página de perfil
  } catch (error) {
    req.flash('error', 'Hubo un error al guardar el menú. Por favor, inténtalo de nuevo.');
    res.redirect('/users/profile'); // Redireccionando a la página de perfil
  }
};

// Quitar un menú guardado del perfil del usuario
exports.unsaveMenu = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedMenus.pull(req.params.id); // Utiliza el ID del menú desde los parámetros de la URL
    await user.save();
    req.flash('success', 'Menú quitado con éxito.');
    res.redirect('/users/profile'); // Redireccionando a la página de perfil
  } catch (error) {
    req.flash('error', 'Hubo un error al quitar el menú. Por favor, inténtalo de nuevo.');
    res.redirect('/users/profile'); // Redireccionando a la página de perfil
  }
};


// Manage Menús
exports.manage = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.render('manageMenus', { menus });
  } catch (error) {
    res.status(500).send(error.message);
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

// Controlador para crear un menú
exports.createMenu = async (req, res, next) => {
  const menuData = req.body;
  menuData.user = req.user._id;  // Aquí se establece el campo usuario

  try {
    const menu = await Menu.create(menuData);
    req.flash('success', 'Menú creado exitosamente.');
    res.redirect('/menus');
  } catch (err) {
    req.flash('error', 'Hubo un error al crear el menú. Por favor, inténtalo de nuevo.');
    res.redirect('/menus/Crear');
  }
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

//Funcion para comparar menus y mostrar lista de la compra
exports.compareMenuPrices = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate({
      path: 'recipes',
      populate: {
        path: 'ingredients.ingredient'
      }
    });

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    let totalIngredients = {};
    let recipeCounts = {};

    for (let recipe of menu.recipes) {
      const recipeTitle = recipe.title;
      recipeCounts[recipeTitle] = (recipeCounts[recipeTitle] || 0) + 1;

      for (let recipeIngredient of recipe.ingredients) {
        const ingredientName = recipeIngredient.ingredient.name;
        const requiredQuantity = recipeIngredient.amount;
        if (!totalIngredients[ingredientName]) {
          totalIngredients[ingredientName] = { requiredQuantity: 0, supermarkets: recipeIngredient.ingredient.supermarkets };
        }
        totalIngredients[ingredientName].requiredQuantity += requiredQuantity;
      }
    }

    let shoppingList = {};

    for (let ingredient in totalIngredients) {
      const requiredQuantity = totalIngredients[ingredient].requiredQuantity;
      const supermarkets = totalIngredients[ingredient].supermarkets;

      for (let supermarket of supermarkets) {
        const supermarketName = supermarket.name;
        const packageQuantity = supermarket.quantity;
        const packagePrice = supermarket.price;

        const totalPackages = Math.ceil(requiredQuantity / packageQuantity);
        const totalCost = totalPackages * packagePrice;

        if (!shoppingList[supermarketName]) {
          shoppingList[supermarketName] = { ingredients: [], totalCost: 0 };
        }

        shoppingList[supermarketName].ingredients.push({
          ingredient: ingredient,
          packages: totalPackages,
          cost: totalCost,
          requiredQuantity: requiredQuantity, // Cantidad necesaria
          packageQuantity: packageQuantity // Cantidad en paquete
        });

        shoppingList[supermarketName].totalCost += totalCost;
      }
    }

    const items = Object.keys(recipeCounts).map(title => ({
      title: title,
      count: recipeCounts[title],
      ingredients: menu.recipes.find(r => r.title === title).ingredients.map(ing => ing.ingredient)
    }));

    res.render('ComparePrices', { items, shoppingList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


