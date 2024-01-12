const Ingredient = require('../model/ingredientsModel');

exports.createIngredient = async (req, res) => {
  const { name, description, category, subcategory } = req.body;
  // const { icon } = req.file;

  console.log(">>", req.body);
  const refData = {
    name: name,
    icon: req.file.filename,
    description: description,
    category: category,
    subcategory: subcategory
  }
  console.log(refData);
  try {
    const newIngredient = await Ingredient.create(refData);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    return res.status(500).json(
      {
        code: 500,
        error: error.message
      }
    );
  }
};

exports.updateIngredientById = async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIngredientById = async (req, res) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllIngredients = async (req, res) => {
  try {
    // Delete all ingredients
    const deleteAllIngredient = await Ingredient.deleteMany({});
    if (deleteAllIngredient.deletedCount>0) {
      return res.status(200).json({ message: 'All ingredients deleted successfully.' });
    }
    else{
      return res.status(200).json({ message: 'No ingredients found to delete.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};