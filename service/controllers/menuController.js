const Menu = require('../models/menu');

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

// Mostrar todos los menús
exports.getAllMenus = async () => {
  try {
    const menus = await Menu.find();
    return menus;
  } catch (error) {
    console.log(error);
    return [];
  }
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
exports.createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    menu.owner = req.user._id;
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Función para comparar los precios de los ingredientes de un menú en diferentes supermercados
exports.compareMenuPrices = async (req, res) => {
  try {
    // Busca el menú por su ID y llena el campo 'recipes' con los datos completos de las recetas
    const menu = await Menu.findById(req.params.id).populate('recipes');
    
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Crea un objeto para almacenar la suma de los precios de los ingredientes para cada supermercado
    let supermarkets = {};
    
    // Para cada receta en el menú...
    for (let recipe of menu.recipes) {
      // ...y para cada ingrediente en la receta...
      for (let ingredient of recipe.ingredients) {
        // ...y para cada supermercado en los precios del ingrediente...
        for (let supermarket in ingredient.prices) {
          // ...si el supermercado no está ya en el objeto 'supermarkets', añádelo con un precio inicial de 0
          if (!(supermarket in supermarkets)) {
            supermarkets[supermarket] = 0;
          }
          // Suma el precio del ingrediente en ese supermercado al total del supermercado
          supermarkets[supermarket] += ingredient.prices[supermarket];
        }
      }
    }

    // Convierte el objeto 'supermarkets' en un array y ordénalo por precio ascendente
    let sortedSupermarkets = Object.entries(supermarkets).sort((a, b) => a[1] - b[1]);

    // Devuelve el array ordenado de supermercados y precios
    res.status(200).json(sortedSupermarkets);
    
  } catch (error) {
    // Si hay un error, devuelve un mensaje de error
    res.status(500).json({ message: error.message });
  }
};

