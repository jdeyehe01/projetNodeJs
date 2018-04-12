const ModelIndex = require('../models');
const Ingredient = ModelIndex.Ingredient;

const IngredientController = function() {};

IngredientController.add = function(name,typeIngredient,quantite){
  return Ingredient.create({
    name: name,
    typeIngredient: typeIngredient,
    quantite: quantite
  });
};

IngredientController.getAll = function(){
  return Ingredient.findAll()
    .catch(function(err){
      console.error(err);
    });
};


IngredientController.getById = function(id){
return Ingredient.find({
    where: {
      id: id
    }
  }).then(function(ingredient){
    if(ingredient){
      console.log("Ingredient trouvé");
      return ingredient;
    }else{
      console.log("Ingredient non trouvé ! ");
    }
  }).catch(function(err){
    console.error(err);
  })
}


IngredientController.getByName = function(name){
  return Ingredient.find({
      where: {
        name: name
      }
  }).then(function(ingredient){
    if(ingredient){
      console.log("Ingredient trouvé");
      return ingredient;
    }else{
      console.log("Ingredient non trouvé ! ");
    }
  }).catch(function(err){
    console.error(err);
  })
}
module.exports = IngredientController;
