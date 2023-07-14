const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Mostrar todos los menús
router.get('/', menuController.getAllMenus);

// Mostrar un menú específico
router.get('/:id', menuController.getMenu);

// Crear un nuevo menú
router.post('/', menuController.ensureAuthenticated, menuController.createMenu);

// Actualizar un menú específico
router.put('/:id', menuController.ensureAuthenticated, menuController.verifyMenuOwner, menuController.updateMenu);

// Borrar un menú específico
router.delete('/:id', menuController.ensureAuthenticated, menuController.verifyMenuOwner, menuController.deleteMenu);

// Guardar un menú en el perfil del usuario
router.post('/:id/save', menuController.ensureAuthenticated, menuController.saveMenu);

// Quitar un menú guardado del perfil del usuario
router.post('/:id/unsave', menuController.ensureAuthenticated, menuController.unsaveMenu);

// Comparar los precios de un menú en diferentes supermercados
router.get('/:id/comparePrices', menuController.compareMenuPrices);

module.exports = router;
