const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const BoissonController = controllers.BoissonController;

const boissonRouter = express.Router();
boissonRouter.use(bodyParser.json());


boissonRouter.post('/', function(req, res) {
  const name = req.body.name;
  const volume = parseInt(req.body.volume);
  if(name === undefined || volume === undefined) {
    res.status(400).end();
    return;
  }
  const boisson = BoissonController.add(name, volume)
  .then((boisson) =>{
    res.status(201).json(boisson);
  })
  .catch((err) => {
    res.status(500).end();
  })

});


boissonRouter.get('/all',function(req,res){
 BoissonController.getAll()
    .then((boissons) =>{
      res.status(201).json(boissons);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

boissonRouter.get('/:id/id' , function(req,res){
  BoissonController.getById(req.params.id)
  .then((boisson) =>{
    res.status(201).json(boisson);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


boissonRouter.get('/:name/name' , function(req,res){
  BoissonController.getByName(req.params.name)
  .then((boisson) => {
    res.status(201).json(boisson);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).end();
  })
});


module.exports = boissonRouter;
