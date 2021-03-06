const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const MenuController = controllers.MenuController;
const jwt = require('jsonwebtoken');

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

menuRouter.get('/Menu/:idMenu' , function(req,res){
  const id = req.params.idMenu;
  if(id === undefined ){
    res.status(403).end();
    return;
  }
  MenuController.getMenuById(id)
  .then((menu) =>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    console.error(err);
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

menuRouter.get('/allCompoMenu/:idMenu' , function(req,res){

  const idMenu = req.params.idMenu;

  if(idMenu === undefined) {
    res.status(400).end();
    return;
  }

  MenuController.getMenuCompo(idMenu)
  .then((products) =>{
    res.status(200).json(products);
  })
  .catch((err)=>{
    console.error(err);
  });

});

menuRouter.get('/name/:name' , function(req,res){

  const name = req.params.name;
  if(name === undefined ){
    res.status(403).end();
    return;
  }

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
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
        }else{
      const idProduct = parseInt(req.params.idProduct);
      const idMenu = parseInt(req.params.idMenu);

      if(idProduct === undefined || idMenu === undefined ){
          res.status(403).end();
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
    }
  });
});


menuRouter.delete('/deleteProduit/:idMenu/:idProduct' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const idProduct = parseInt(req.params.idProduct);
      const idMenu = parseInt(req.params.idMenu);

      if(idProduct === undefined || idMenu === undefined ){
          res.status(403).end();
        return;
      }

      MenuController.deleteProduct(idMenu,idProduct);
      res.status(200).end();
    }
  });
});


menuRouter.delete('/deleteMenu/:idMenu' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const id = req.params.idMenu;
      if(id ===undefined ){
        res.status(403).end();
        return;
      }
      MenuController.deleteMenu(id);
      res.status(200).end();
    }
  });
});

module.exports = menuRouter;
