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


ProduitController.addIngredientInProductById = function(idProduct,idIngredient){
  return Ingredient.find({
    where:{
      id:idIngredient
    }
  })
  .then((ingredient) => {
    return ingredient.updateAttributes({
      produit_id : idProduct
    })
  })

}

ProduitController.deleteIngredientById = function(idProduct,idIngredient){
  return Ingredient.destroy({
    where:{
      id: idIngredient,
      produit_id: idProduct
    }
  })
  .then(() => {
      console.log('Ingredient supprimé');
    })
    .catch((err) => {
      console.error(err);
    })
};


module.exports = ProduitController;
