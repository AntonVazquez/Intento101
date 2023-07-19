const mongoose = require('mongoose');

// Define el esquema para un menú
const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Menu', MenuSchema);