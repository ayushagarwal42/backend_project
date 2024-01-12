const express = require('express');
const router = express.Router();
const ingredientsValid = require('../validations/ingredientValidations')
const ingredientController = require('../controller/ingredientController');
const message=require("../middlewares/validResponse")

const {upload}= require("../utils/commonFunctions")
// module.exports = (upload) => {
//     router.post('/createIngredients', upload, ingredientController.createIngredient);
//     return router;
// };



router.post('/createIngredients',upload.single("icon"),ingredientsValid.createIngredientValidation,message.validBodyResponse,ingredientController.createIngredient);
router.get('/getIngredients/:id', ingredientController.getIngredientById);
router.get('/getallIngredients', ingredientController.getAllIngredients);
router.put('/updateIngredients/:id', ingredientsValid.updateIngredientValidation, ingredientController.updateIngredientById);
router.delete('/deleteIngredients/:id', ingredientController.deleteIngredientById);
router.delete('/deleteAllIngredients',ingredientController.deleteAllIngredients);

module.exports=router;