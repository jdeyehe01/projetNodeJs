const ModelIndex = require('../models');
const Produit = ModelIndex.Produit;
//const Ingredient = ModelIndex.Ingredient;

const ProduitController = function() {};

ProduitController.addProduct = function(name,description){
   return Produit.create({
    name : name,
    description: description
  });
};

ProduitController.getAllProduct = function(){
  return Produit.findAll()
  .catch(function(err){
    console.log('Entrée');
    console.error(err);
  });
};

ProduitController.getByName = function(name){
  return Produit.find({
    where:{
      name : name
    }
  }).then(function(produit){
    if(produit){
      return produit;
    }else{
      console.log("Produit non trouvé !");
    }
  }).catch(function(err){
    throw err;
  });
};


ProduitController.getAllIngredient = function(nameProduct,productId){
  return Produit.find({
    where:{
      name : nameProduct
    }
  }).then(function(ingredient){
      return Ingredient.findAll({
        where:{
          produit_id: productId
        }
      });
  }).catch(function(err){
    throw err;
  });
};

module.exports = ProduitController;
