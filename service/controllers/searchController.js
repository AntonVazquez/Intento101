const Recipe = require('../models/recipe');
const Menu = require('../models/menu');
const Ingredient = require('../models/ingredient');

async function paginate(model, query, page, pageSize, populateField, existingResults) {
  let totalCount;
  if (existingResults) {
    totalCount = existingResults.length;
  } else {
    totalCount = await model.countDocuments(query);
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  let results;
  if (existingResults) {
    results = existingResults.slice((page - 1) * pageSize, page * pageSize);
  } else {
    results = model.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    if (populateField) {
      results = results.populate(populateField);
    }
    results = await results;
  }

  return {
    results: results,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage
    }
  };
}

exports.search = async (req, res) => {
  const query = req.query.q;
  const searchType = req.query.type;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;

  let results = {
    recipes: [],
    menus: []
  };

  let pagination = {
    currentPage: page,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false
  };

  try {
    switch (searchType) {
      case 'recipes':
        const recipeQuery = {
          $or: [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') }
          ]
        };
        const paginatedRecipes = await paginate(Recipe, recipeQuery, page, pageSize, 'ingredients.ingredient');
        results.recipes = paginatedRecipes.results;
        pagination = paginatedRecipes.pagination;
        break;

      case 'menus':
        const menuQuery = { name: new RegExp(query, 'i') };
        const paginatedMenus = await paginate(Menu, menuQuery, page, pageSize, 'recipes');
        results.menus = paginatedMenus.results;
        pagination = paginatedMenus.pagination;
        break;

      case 'ingredients':
        let allRecipesWithIngredient = [];
        const ingredients = await Ingredient.find({ name: new RegExp(query, 'i') });
        for (const ingredient of ingredients) {
          const recipesWithIngredient = await Recipe.find({ 'ingredients.ingredient': ingredient._id })
            .populate('ingredients.ingredient');
          allRecipesWithIngredient = allRecipesWithIngredient.concat(recipesWithIngredient);
        }

        const matchingRecipeIds = allRecipesWithIngredient.map(recipe => recipe._id);
        results.menus = await Menu.find({ 'recipes': { $in: matchingRecipeIds } }).populate('recipes');
        const paginatedIngredients = await paginate(Recipe, null, page, pageSize, 'ingredients.ingredient', allRecipesWithIngredient);
        results.recipes = paginatedIngredients.results;
        pagination = paginatedIngredients.pagination;
        break;
    }

    res.render('SearchResults', { results: results, pagination: pagination, searchType: searchType, query: query });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error durante la búsqueda');
  }
};
