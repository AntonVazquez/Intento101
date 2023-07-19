const mongoose = require('mongoose');

// Define el esquema para una receta
const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true
      },
      amount: {
        type: String
      },
      prices: [
        {
          supermarket: {
            type: String,
            required: true
          },
          price: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ],
  instructions: {
    type: String,
    required: true
  },
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

module.exports = mongoose.model('Recipe', RecipeSchema);
