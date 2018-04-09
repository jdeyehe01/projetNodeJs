//Déclaration

const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const models = require('../models');

const BorneController = controllers.BorneController;
const borneRouter = express.Router();
borneRouter.use(bodyParser.json());

// Les routes

borneRouter.post('/ingredient', function(req, res) {
  const name = req.body.name;
  const type = req.body.type;
  const quantite = parseInt(req.body.quantite);
  if(name === undefined || type === undefined || quantite === undefined) {
    res.status(400).end();
    return;
  }
  const ingredient = BorneController.createIngredient(name, type , quantite);
  res.status(201).json(ingredient);
});


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

// Fin

module.exports = borneRouter;
