const mongoose = require('mongoose');

// Define el esquema para un menú
const MenuSchema = new mongoose.Schema({
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

mongoose.model('Menu', MenuSchema);
