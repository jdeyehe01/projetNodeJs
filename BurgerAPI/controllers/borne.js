const models = require('../models');
const Ingredient = models.Ingredient;
const Produit = models.Produit;

const BorneController = function() { };
let autoIncrement = 1;
var ingredients = [];
const produits = [];
//Creation


BorneController.getAllProduct = function() {
  return produits;
}


BorneController.getAllIngredientByProduct = function(nameProduit) {
    const produit = BorneController.getByName(nameProduit);
    const ing = produit.ingredients;

    return ing;
}


BorneController.getByName = function(name){
    return produits.find(function(e){
      return e.name === name;
    });
};

BorneController.createIngredient = function(name,desc,quantite){

  const newIngredient = new Ingredient(name,desc,quantite);
  ingredients.push(newIngredient);
  return newIngredient;

};

BorneController.createProduit = function(name,description, ingredients){
  const newProduit =new Produit(autoIncrement++,name,description,ingredients);
  produits.push(newProduit);
  return newProduit;
};


BorneController.addIngredient = function(nameProduit ,ingredient){
  if(nameProduit === undefined){
    nameProduit = "Inconnue";
  }
  const produit = BorneController.getByName(nameProduit);
  produit.ingredients.push(ingredient);

  return(produit);

};


//Fin

module.exports = BorneController;
