//Déclaration

const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const models = require('../models');

const BorneController = controllers.BorneController;
const borneRouter = express.Router();
borneRouter.use(bodyParser.json());

// Les routes


borneRouter.post('/produit' , function(req,res){
const nameP = req.body.name;
const description = req.body.description;
const ingredients = req.body.ingredients;

if(nameP === undefined || description === undefined || ingredients === undefined) {
  res.status(400).end();
  return;
}

const newProduit = BorneController.createProduit(nameP,description,ingredients);
res.status(201).json(newProduit);
});

borneRouter.get('/allProduct' , function(req,res){
  const products = BorneController.getAllProduct();
  res.json(products);

});

borneRouter.get('/allIngredient/:productName' , function(req,res){
  const ingredients = BorneController.getAllIngredientByProduct(req.params.productName)
  res.json(ingredients);
});


borneRouter.post('/:productName/addIngredient', function(req, res) {

  const name = req.body.name;
  const type = req.body.type;
  const quantite = parseInt(req.body.quantite);
  const ingredients = BorneController.getAllIngredientByProduct(req.params.productName)

  if(name === undefined || type === undefined || quantite === undefined || ingredients === undefined ) {
    res.status(400).end();
    return;
  }

  const i = BorneController.createIngredient(name, type , quantite);

});

// Fin

module.exports = borneRouter;
