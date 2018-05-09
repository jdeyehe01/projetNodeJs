const ModelIndex = require('../models');
const Product = ModelIndex.Product;
const Ingredient = ModelIndex.Ingredient;

const ProductController = function() {};

ProductController.addProduct = function(name,description,unitPrice){
  return Product.create({
    name: name,
    description: description,
    unitPrice: unitPrice
  })
};



ProductController.addFindOrCreateProduct = function(name,description,price,idPromotion){

  return Product.findOrCreate({
    where: {
      name: name
    },
    defaults:{
      name: name,
      description: description,
      unitprice: price,
      promotion_id: idPromotion
    }
  })
  .catch((err)=>{
    console.error(err);
  });
};

ProductController.deleteIngredientById = function(idProduct,idIngredient){
  return Ingredient.destroy({
    where:{
      id: idIngredient,
      product_id: idProduct
    }
  })
  .then(() => {
      console.log('Ingredient supprimé');
    })
    .catch((err) => {
      console.error(err);
    })
};

ProductController.updateQuantity = function(idProduct,idIngredient, newQuantity){

  const ingredient = Ingredient.find({
    where:{
      product_id: idProduct,
      id: idIngredient
    }
  });

  if(ingredient === undefined){
    return;
  }

  if(newQuantity<=0){
    ProductController.deleteIngredientById(idProduct,idIngredient);
  }

  ingredient.updateAttributes({
    quantity: newQuantity
  });

  return ingredient;

};


ProductController.getAllProduct = function(){
  return Product.findAll()
  .catch((err) => {
    console.error(err);
  });
};


ProductController.getProductById = function(productId){
  return Product.find({
    where: {
      id: productId
    }
  })
  .then((product) => {
    console.log('Product trouvé');
    return product;
  })
  .catch((error) => {
    console.error(err);
  });
};


ProductController.getProductByName = function(productName){
  return Product.find({
    where: {
      name: productName
    }
  })
  .then((product) => {
    console.log('Product trouvé');
    return product;
  })
  .catch((error) => {
    console.error(err);
  });
};


ProductController.allIngredientProduct = function(id){
   return Ingredient.findAll({
     where:{
       product_id: id
     }
   })
};


ProductController.addIngredientInProductById = function(idProduct,idIngredient){
  return Ingredient.find({
    where:{
      id:idIngredient
    }
  })
  .then((ingredient) => {
    return ingredient.updateAttributes({
      product_id : idProduct
    })
  })

}


module.exports = ProductController;
