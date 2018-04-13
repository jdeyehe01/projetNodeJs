const ModelIndex = require('../models');
const Produit = ModelIndex.Produit;
const Ingredient = ModelIndex.Ingredient;

const ProduitController = function() {};

ProduitController.addProduct = function(name,description){
  return Produit.create({
    name: name,
    description: description
  })
};


ProduitController.getAllProduct = function(){
  return Produit.findAll()
  .catch((err) => {
    console.error(err);
  });
};


ProduitController.getProductById = function(productId){
  return Produit.find({
    where: {
      id: productId
    }
  })
  .then(() => {
    console.log('Produit trouvé');
  })
  .catch((error) => {
    console.error(err);
  });
};


ProduitController.getProductByName = function(productName){
  return Produit.find({
    where: {
      name: productName
    }
  })
  .then(() => {
    console.log('Produit trouvé');
  })
  .catch((error) => {
    console.error(err);
  });
};


ProduitController.allIngredientProduct = function(id){
   return Ingredient.findAll({
     where:{
       produit_id: id
     }
   })
};
//ProduitController.addIngredientInProduct = function(idProduct)
module.exports = ProduitController;
