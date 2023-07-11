const mongoose = require('mongoose');

// Define el esquema para una receta
const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [
    {
      type: String,
      required: true
    }
  ],
  typeOfFood: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

mongoose.model('Recipe', RecipeSchema);
