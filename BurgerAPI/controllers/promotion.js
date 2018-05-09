const ModelIndex = require('../models');
const Menu = ModelIndex.Menu;
const Ingredient = ModelIndex.Ingredient;
const Product = ModelIndex.Product;
const Promotion = ModelIndex.Promotion;

const PromotionController = function() {};

PromotionController.addPromotion = function(name,description,price){
  return Promotion.create({
    name: name,
    description: description,
    price: price
  })
};

PromotionController.getAll = function(){
  return Promotion.findAll({

    include:[
      {
        model: Menu,
        through: {
          attributes: ['name'],
          where: {completed : true}
      }
    } ,
      {
        model: Product,
        through: {
          attributes: ['name'],
          where: {completed : true}
      }
    },
      {
        model: Ingredient,
        through: {
          attributes: ['name'],
          where: {completed : true}
      }
    }
    ]

  })

};


PromotionController.getPromotionById = function(promotionId){
  return Promotion.findById(promotionId)
  .then((promotion) => {
    console.log('Promotion trouvé');
    return promotion;
  })
  .catch((error) => {
    console.error(err);
  });
};


PromotionController.getPromotionByName = function(promotionName){
  return Promotion.find({
    where: {
      name: promotionName
    }
  })
  .then((promotion) => {
    console.log('Promotion trouvé');
    return promotion;
  })
  .catch((error) => {
    console.error(err);
  });
};

PromotionController.addMenu = function(idPromotion,IdMenu){
return  Menu.findById(IdMenu)
  .then((menu) =>{
    return  menu.updateAttributes({
      promotion_id: idPromotion
    });
  })
  .catch((err) => {
    console.error(err);
  });
}


  PromotionController.addProduct = function(idPromotion,idProduct){
    return Product.findById(idProduct)
    .then((product) =>{
      return  product.updateAttributes({
        promotion_id: idPromotion
      });
      console.log('Le menu a été ajouté aux promotions');

    })
    .catch((err) => {
      console.error(err);
    });
  }


  PromotionController.addIngredient= function(idPromotion,idIngredient){
    return Ingredient.findById(idIngredient)
    .then((ingredient) =>{
      return ingredient.updateAttributes({
        promotion_id: idPromotion
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }


module.exports = PromotionController;
