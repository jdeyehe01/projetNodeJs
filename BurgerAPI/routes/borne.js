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
  const desc = req.body.desc;
  if(name === undefined || desc === undefined) {
    res.status(400).end();
    return;
  }
  const ingredient = BorneController.createIngredient(name, desc);
  res.status(201).json(ingredient);
})

// Fin

module.exports = borneRouter;
