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

module.exports = produitRouter;
