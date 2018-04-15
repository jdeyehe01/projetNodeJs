const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const MenuController = controllers.MenuController;

const menuRouter = express.Router();
menuRouter.use(bodyParser.json());


menuRouter.post('/', function(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  if(name === undefined || description === undefined) {
    res.status(400).end();
    return;
  }
  const menu = MenuController.add(name, description)
  .then((menu) =>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    res.status(500).end();
  })

});


menuRouter.get('/all',function(req,res){
 MenuController.getAll()
    .then((menus) =>{
      res.status(201).json(menus);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

menuRouter.get('/:id/id' , function(req,res){
  MenuController.getById(req.params.id)
  .then((menu) =>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


menuRouter.get('/:name/name' , function(req,res){
  MenuController.getByName(req.params.name)
  .then((menu) => {
    res.status(201).json(menu);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).end();
  })
});

menuRouter.post('/newMenu/:produitId/:boissonId' , function(req,res){
  const idP = req.params.produitId;
  const idB = req.params.boissonId;
  const name = req.body.name;
  const desc = req.body.description;


  const newMenu = MenuController.newMenu(name,desc,idP,idB);
  res.status(201).json(newMenu);
});

module.exports = menuRouter;
