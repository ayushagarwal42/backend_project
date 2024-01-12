const { body, check } = require('express-validator');

exports.createIngredientValidation = [

  body('name').notEmpty(),
  body('description').notEmpty(),
  body('category').notEmpty(),
  body('subcategory').optional(),
];

exports.updateIngredientValidation = [
  
  body('name').optional(),
  // body('icon').optional(),
  body('description').optional(),
  body('category').optional().isArray(),
  body('subcategory').optional(),
];