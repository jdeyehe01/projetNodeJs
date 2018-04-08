const models = require('../models');
const Ingredient = models.Ingredient;

const BorneController = function() { };
//Creation

BorneController.createIngredient = function(name,desc){

  const newIngredient = new Ingredient(name,desc);

  return newIngredient;

}


//Fin

module.exports = BorneController;
