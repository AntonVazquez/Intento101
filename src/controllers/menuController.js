const Menu = require('../models/menu');

// Mostrar todos los menús
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
