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
            type: String
          },
          price: {
            type: Number
          }
        }
      ]
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