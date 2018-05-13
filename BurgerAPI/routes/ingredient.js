const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const IngredientController = controllers.IngredientController;

const ingredientRouter = express.Router();
ingredientRouter.use(bodyParser.json());


ingredientRouter.post('/', function(req, res) {
  const name = req.body.name;
  const type = req.body.type;
  const quantite = parseInt(req.body.quantite);
  if(name === undefined || type === undefined || quantite === undefined) {
    res.status(400).end();
    return;
  }
  const ingredient = IngredientController.add(name, type , quantite)
  .then((ingredient) =>{
    res.status(201).json(ingredient);
  })
  .catch((err) => {
    res.status(500).end();
  })

});


ingredientRouter.get('/all',function(req,res){
 IngredientController.getAll()
    .then((ingredients) =>{
      res.status(201).json(ingredients);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

ingredientRouter.get('/id/:id' , function(req,res){

  const id = req.params.id;
  if(id === undefined ){
    res.status(403).end();
    return;
  }
  IngredientController.getById(id)
  .then((ingredient) =>{
    res.status(201).json(ingredient);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


ingredientRouter.get('/name/:name' , function(req,res){

  const name = req.params.name;
  if(name === undefined ){
    res.status(403).end();
    return;
  }
  IngredientController.getByName(name)
  .then((ingredient) => {
    res.status(201).json(ingredient);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).end();
  })
});

module.exports = ingredientRouter;