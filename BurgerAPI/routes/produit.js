const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const ProduitController = controllers.ProduitController;

const produitRouter = express.Router();
produitRouter.use(bodyParser.json());

produitRouter.post('/addProductWithouIngredient', function(req, res) {
  const name = req.body.name;
  const desc = req.body.description;
  if(name === undefined || desc === undefined) {
    res.status(400).end();
    return;
  }
const produit =  ProduitController.addProduct(name,desc)
  .then((produit) => {
    res.status(201).json(produit);
  })
  .catch((err) => {
    res.status(500).end();
  });
});


produitRouter.get('/allProduct', function(req,res){
  ProduitController.getAllProduct()
  .then((produits) => {
    res.status(201).json(produits);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


produitRouter.get('/allIngredientProduct/:id' , function(req,res){
  const id = req.params.id;

 ProduitController.allIngredientProduct(id)
 .then((ingredients) =>{
   res.status(201).json(ingredients);
 })
 .catch((err) => {
   console.error(err);
   res.status(500).end();
 })
});


produitRouter.post('/addIngredient/:idProduct/:idIngredient' ,function(req,res){

  const idP = req.params.idProduct;
  const idI = req.params.idIngredient;

 ProduitController.addIngredientInProductById(idP,idI)
 .then(() => {
   const ingredients = ProduitController.allIngredientProduct(idP)
   .then((ingredients) =>{
     res.status(201).json(ingredients);
   })
   .catch((err) => {
     console.error(err);
     res.status(500).end();
   })
 })
 .catch((err) =>{
   console.error(err);
 });
});


produitRouter.delete('/deleteIngredient/:idProduct/:idIngredient' , function(req,res){

  const idProduit = req.params.idProduct;
  const idIngredient = req.params.idIngredient;

  if(idProduit === undefined || idIngredient === undefined){
    res.status(500).end();
    return;
  }

    ProduitController.deleteIngredientById(idProduit,idIngredient)
    .then(() => {
      const ing = ProduitController.allIngredientProduct(idProduit)
      .then((ing) => {
        res.status(201).json(ing);
      })
      .catch((err) => {
        console.error(err);
      })
    })
});

module.exports = produitRouter;

