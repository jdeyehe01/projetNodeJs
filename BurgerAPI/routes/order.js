const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const OrderController = controllers.OrderController;

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.post('/', function(req, res) {

  const order =  OrderController.addOrder(0)
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

orderRouter.post('/addProduct/:idProduct/:idOrder' , function(req,res){
  const idProduct = parseInt(req.params.idProduct);
  const idOrder = parseInt(req.params.idOrder);

  if(idProduct === undefined || idOrder === undefined ){
      res.status(403).end();
    return;
  }

  OrderController.addProduct(idOrder, idProduct)
  .then((product)=>{
    res.status(201).json(product);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

orderRouter.post('/addMenu/:idMenu/:idOrder' , function(req,res){
  const idMenu = parseInt(req.params.idMenu);
  const idOrder = parseInt(req.params.idOrder);

  if(idMenu === undefined || idOrder === undefined ){
      res.status(403).end();
    return;
  }

  OrderController.addProduct(idOrder, idMenu)
  .then((menu)=>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

orderRouter.post('/addPromotion/:idPromotion/:idOrder' , function(req,res){
  const idPromotion = parseInt(req.params.idPromotion);
  const idOrder = parseInt(req.params.idOrder);

  if(idPromotion === undefined || idOrder === undefined ){
      res.status(403).end();
    return;
  }

  OrderController.addProduct(idOrder, idPromotion)
  .then((promotion)=>{
    res.status(201).json(promotion);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


orderRouter.get('/allOrder', function(req,res){
  OrderController.getAllOrder()
  .then((orders) => {
    res.status(201).json(orders);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


orderRouter.delete('/deleteOrder/:idOrder' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end();
      return;
    }
    else{
      const idOrder = req.params.idOrder;

      if(idOrder === undefined){
        res.status(403).end('Acces refusé');
        return;
      }
      OrderController.deleteOrder(idOrder)
        .then((order) => {
          res.status(201).json(order);
        })
        .catch((err) => {
          console.error(err);
        })
      }
  });
});

orderRouter.delete('/deleteProduct/:idOrder/:idProduct' , function(req,res){
      const idProduct = parseInt(req.params.idProduct);
      const idOrder = parseInt(req.params.idOrder);

      if(idProduct === undefined || idOrder === undefined ){
          res.status(403).end();
        return;
      }
      OrderController.deleteProduct(idOrder, idProduct);
      res.status(200).end();
});

orderRouter.delete('/deleteMenu/:idOrder/:idMenu' , function(req,res){
  const idMenu = parseInt(req.params.idMenu);
  const idOrder = parseInt(req.params.idOrder);

  if(idMenu === undefined || idOrder === undefined ){
      res.status(403).end();
    return;
  }
  OrderController.deleteMenu(idOrder, idMenu);
  res.status(200).end();
});

orderRouter.delete('/deletePromotion/:idOrder/:idPromotion' , function(req,res){
  const idPromotion = parseInt(req.params.idPromotion);
  const idOrder = parseInt(req.params.idOrder);

  if(idPromotion === undefined || idOrder === undefined ){
      res.status(403).end();
    return;
  }
  OrderController.deletePromotion(idOrder, idPromotion);
  res.status(200).end();
});

orderRouter.put('/updateOrder' , function(req,res){
  const idOrder = req.body.idOrder;
  const price = req.body.price;

  OrderController.updateOrder(idOrder, price)
  .then(()=>{
    console.log("Mise à jour de la commande.");
  })
  .catch((err) => {
    console.error(err);
  })
});

module.exports = orderRouter;
