const ModelIndex = require('../models');
const Ingredient = ModelIndex.Ingredient;

const IngredientController = function() {};

IngredientController.add = function(name,ingredientType,quantity){
  return Ingredient.create({
    name: name,
    ingredientType: ingredientType,
    quantity: quantity
  });
};

IngredientController.getAll = function(){
  return Ingredient.findAll()
    .catch(function(err){
      console.error(err);
    });
};

IngredientController.addFindOrCreateIngredient = function(name,ingredientType,quantity,idProduct){

  return Ingredient.findOrCreate({
    where: {
      name: name,
      product_id: ''
    },
    defaults:{
      name: name,
      ingredientType: ingredientType,
      quantity: quantity,
      product_id: idProduct
    }
  })
  .catch((err)=>{
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
};


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
};



module.exports = IngredientController;
