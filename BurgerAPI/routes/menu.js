const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const MenuController = controllers.MenuController;

const menuRouter = express.Router();
menuRouter.use(bodyParser.json());


menuRouter.post('/', function(req, res) {
  const name = req.body.name;
  const description = req.body.description;
  const price = parseFloat(req.body.price);
  if(name === undefined || description === undefined || price === undefined) {
    res.status(400).end();
    return;
  }
  const menu = MenuController.add(name, description,price)
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
/*
menuRouter.getById('/:id/id' , function(req,res){
  MenuController.getById(req.params.id)
  .then((menu) =>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

*/
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

menuRouter.post('/addProduct/:idProduct/:idMenu' , function(req,res){
  const idProduct = parseInt(req.params.idProduct);
  const idMenu = parseInt(req.params.idMenu);

  if(idProduct === undefined || idMenu === undefined ){
      res.status(400).end();
    return;
  }

  MenuController.addProduct(idMenu,idProduct)
  .then((product)=>{
    res.status(201).json(product);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


menuRouter.delete('/deleteProduit/:idMenu/:idProduct' , function(req,res){
  const idProduct = parseInt(req.params.idProduct);
  const idMenu = parseInt(req.params.idMenu);

  if(idProduct === undefined || idMenu === undefined ){
      res.status(400).end();
    return;
  }

  MenuController.deleteProduct(idMenu,idProduct);
  res.status(202).end();

});
/*
menuRouter.post('/addTabProduct/:idMenu' , function(req,res){
  const tabProduct = req.body;
  const idMenu = req.params.idMenu;
  if(tabProduct === undefined || idMenu === undefined ){
    res.status(400).end();
    return;
  }
  for(prod in tabProduct){
      res.status(200).json(tabProduct);
  }

});

*/

menuRouter.delete('/deleteMenu/:idMenu' , function(req,res){
  const id = req.params.idMenu;
  if(id ===undefined ){
    res.status(401).end();
    return;
  }
  MenuController.deleteMenu(id);
  res.status(202).end();
});

module.exports = menuRouter;
