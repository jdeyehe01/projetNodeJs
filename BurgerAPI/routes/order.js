const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const OrderController = controllers.OrderController;

const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.post('/', function(req, res) {
  const price = 0;
  const order =  OrderController.addOrder(price)
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      res.status(500).end();
    });
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

/*
orderRouter.get('/allIngredientProduct/:id' , function(req,res){
  const id = req.params.id;

 ProductController.allIngredientProduct(id)
 .then((ingredients) =>{
   res.status(201).json(ingredients);
 })
 .catch((err) => {
   console.error(err);
   res.status(500).end();
 })
});*/

/*
orderRouter.post('/addIngredient/:idProduct/:idIngredient' ,function(req,res){

  const idP = req.params.idProduct;
  const idI = req.params.idIngredient;

 OrderController.addIngredientInProductById(idP,idI)
 .then(() => {
   const ingredients = ProductController.allIngredientProduct(idP)
   .then((ingredients) =>{
     res.status(201).json(ingredients);
   })
   .catch((err) => {
     console.error(err);
     res.status(500).end();
   })
 })
 .catch((err) =>{
   console.error(err);
 });
});
*/

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