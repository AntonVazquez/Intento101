const Ingredient = require('../models/ingredient');

exports.createIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json({ ingredient });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// en tu controlador de Ingredientes
exports.createMultipleIngredients = async (req, res) => {
    try {
      const ingredients = req.body;
      const newIngredients = await Ingredient.insertMany(ingredients);
      res.status(201).json(newIngredients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.getAll = async (req, res) => {
    try {
        const ingredients = await Ingredient.find(); // Aquí se asume que tienes un modelo llamado "Ingredient"
        res.status(200).json(ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchIngredients = (req, res) => {
  // Limpiar y limitar el tamaño del nombre del ingrediente a buscar
  let name = req.query.name;
  if (name.length > 20) name = name.substr(0, 20);

  // Buscar ingredientes cuyo nombre contiene el valor de 'name'
  Ingredient.find({ name: { $regex: name, $options: 'i' } }) // 'i' hace la búsqueda case-insensitive
      .limit(10) // limitar los resultados a 10 ingredientes
      .exec()
      .then(ingredients => {
          return res.status(200).json(ingredients);
      })
      .catch(err => {
          console.log(err);
          return res.status(500).json({ error: 'Error al buscar ingredientes' });
      });
};
