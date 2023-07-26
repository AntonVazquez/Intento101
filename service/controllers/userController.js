const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Mostrar formulario de registro
exports.showRegisterForm = (req, res) => {
  res.render('register', { messages: req.flash() });
};

// Registro de usuarios
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    username,
    email,
    password,  
  });

  try {
    await newUser.save();
    req.flash('success', 'Registrado con éxito. Por favor inicie sesión.');
    res.redirect('/users/login');
  } catch (err) {
    req.flash('error', 'Hubo un error al intentar registrarte. Por favor, inténtalo de nuevo.');
    res.redirect('/users/register');
  }
};

// Mostrar formulario de login
exports.showLoginForm = (req, res) => {
  res.render('login', { messages: req.flash() });
};

// Autenticación de usuarios
exports.loginUser = passport.authenticate('local', {
  successRedirect: '/users/profile',
  successFlash: 'Has iniciado sesión con éxito.',
  failureRedirect: 'login',
  failureFlash: 'Usuario o contraseña incorrectos.',
});

// Middleware para garantizar que el usuario esté autenticado
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
};

// Cerrar sesión
exports.logout = (req, res, next) => {
  console.log('req:', req);
  console.log('req.logout:', req.logout);
  
  req.logout(function(err) {
    if (err) {
      console.log('Hubo un error durante el logout:', err);
      return next(err);
    }
    
    req.flash('success', 'Has cerrado sesión con éxito.');
    res.redirect('/users/login');
  });
};


// Mostrar perfil del usuario
exports.showProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render('profile', { user, messages: req.flash() });
};

// Actualizar perfil del usuario
exports.updateProfile = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
  res.render('profile', { user: updatedUser, messages: req.flash() });
};

// Mostrar recetas del usuario
exports.showRecipes = async (req, res) => {
  const user = await User.findById(req.user._id).populate('recipes');
  res.render('recipes', { recipes: user.recipes, messages: req.flash() });
};

// Mostrar menús creados por el usuario
exports.showCreatedMenus = async (req, res) => {
  const user = await User.findById(req.user._id).populate('createdMenus');
  res.render('menus', { menus: user.createdMenus, messages: req.flash() });
};

// Mostrar menús guardados por el usuario
exports.showSavedMenus = async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedMenus');
  res.render('savedMenus', { menus: user.savedMenus, messages: req.flash() });
};

// Guardar una receta en el perfil del usuario
exports.saveRecipe = async (req, res) => {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;
  
    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
      res.status(200).json({ message: 'Recipe saved successfully' });
    } else {
      res.status(400).json({ message: 'Recipe already saved' });
    }
  };
  
  // Quitar una receta guardada del perfil del usuario
  exports.unsaveRecipe = async (req, res) => {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;
  
    const index = user.savedRecipes.indexOf(recipeId);
    if (index !== -1) {
      user.savedRecipes.splice(index, 1);
      await user.save();
      res.status(200).json({ message: 'Recipe unsaved successfully' });
    } else {
      res.status(400).json({ message: 'Recipe not found in saved recipes' });
    }
  };
