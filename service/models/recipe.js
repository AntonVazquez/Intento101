const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ],
  instructions: {
    type: String,
    required: true
  },
  typeOfFood: [{
    type: String
  }],
  difficulty: {
    type: String,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
