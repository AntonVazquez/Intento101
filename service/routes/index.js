// Importa los routers de los distintos componentes
const adminRoutes = require('./adminRoutes');
const menuRoutes = require('./menuRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const homeRoutes = require('./homeRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const searchRoutes = require('./searchRoutes');

// Exporta una función que toma una aplicación Express y monta las rutas
module.exports = function(app) {
  // Asigna los routers a sus respectivas rutas
  app.use('/admin', adminRoutes);
  app.use('/menus', menuRoutes);
  app.use('/recipes', recipeRoutes);
  app.use('/users', userRoutes);
  app.use('/home', homeRoutes);
  app.use('/ingredient', ingredientRoutes);
  app.use('/search', searchRoutes);
};
