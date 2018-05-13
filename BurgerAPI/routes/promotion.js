const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const PromotionController = controllers.PromotionController;
const MenuController = controllers.MenuController;
const ProductController = controllers.ProductController;
const IngredientController = controllers.IngredientController;
const jwt = require('jsonwebtoken');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());


promotionRouter.post('/addPromotion' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
        const name = req.body.name;
        const desc = req.body.description
        const price = parseFloat(req.body.price);

      if(name === undefined || desc === undefined || price === undefined ){
        res.status(400).end();
        return;
      }

        PromotionController.addPromotion(name,desc,price)
        .then((promotion) => {
          res.status(201).json(promotion);
        })
        .catch((err) => {
          res.status(500).end();
        });
      }
    });
});


promotionRouter.get('/getAll' , function(req,res){

  PromotionController.getAll()
  .then((promotion) => {
    res.status(201).json(promotion);
  })
  .catch((err) => {
    res.status(500).end();
  });
});

//On ajoute un menu déjà créé (existe dans la bdd) aux promotions

promotionRouter.post('/addExistMenu/:idMenu/:idPromotion' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const idMenu = req.params.idMenu;
      const idPromotion = req.params.idPromotion;

      if(idMenu === undefined || idPromotion === undefined){
        res.status(400).end();
        return;
      }

      PromotionController.addMenu(idPromotion,idMenu)
      .then((menu)=>{
        res.status(200).json(menu);
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  });
});


//On ajoute un produit déjà créé aux promotions

promotionRouter.post('/addExistMenu/:idProduct/:idPromotion' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const idProduct = req.params.idProduct;
      const idPromotion = req.params.idPromotion;

      if(idProduct === undefined || idPromotion === undefined){
        res.status(400).end();
        return;
      }

      PromotionController.addProduct(idPromotion,idProduct)
      .then((product)=>{
        res.status(200).json(product);
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  });
});


//On ajoute un ingredient aux promotions qui existe déjà
promotionRouter.post('/addExistMenu/:idProduct/:idIngredient' , function(req,res){
    jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
        const idIngredient = req.params.idIngredient;
        const idPromotion = req.params.idPromotion;

        if(idIngredient === undefined || idPromotion === undefined){
          res.status(400).end();
          return;
        }

        PromotionController.addIngredient(idPromotion,idIngredient)
        .then((ingredient)=>{
          res.status(200).json(ingredient);
        })
        .catch((err)=>{
          console.error(err);
        })
      }
    });
});

//On crée un menu puis on l'ajoute aux promotions

promotionRouter.post('/createAndAddMenu',function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const name = req.body.name;
      const desc = req.body.description;
      const price = parseFloat(req.body.price);
      const idPromotion = req.body.idPromotion;

      if(name === undefined || desc === undefined || price === undefined || idPromotion === undefined ){
        res.status(400).end();
        return;
      }

      MenuController.findOrCreateMenu(name,desc,price,idPromotion)
      .then(() => {
        PromotionController.getPromotionById(idPromotion)
        .then((promotion) => {
          res.status(201).json(promotion);
        })
        .catch((err)=>{
          console.error(err);
        })

      })
      .catch((err) => {
        res.status(500).end();
      });
    }
  });
});



//On crée un produit puis on l'ajoute aux promotions
promotionRouter.post('/createAndAddProduct',function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const name = req.body.name;
      const desc = req.body.description;
      const price = parseFloat(req.body.price);
      const idPromotion = req.body.idPromotion;

      if(name === undefined || desc === undefined || price === undefined || idPromotion === undefined ){
        res.status(400).end();
        return;
      }

      MenuController.findOrCreateProduct(name,desc,price,idPromotion)
      .then(() => {
        PromotionController.getPromotionById(idPromotion)
        .then((promotion) => {
          res.status(201).json(promotion);
        })
        .catch((err)=>{
          console.error(err);
        })

      })
      .catch((err) => {
        res.status(500).end();
      });
    }
  });
});


module.exports = promotionRouter;
