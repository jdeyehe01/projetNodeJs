const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const ProductController = controllers.ProductController;

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post('/', function(req, res) {
  const name = req.body.name;
  const desc = req.body.description;
  const price = req.body.price;

  if(name === undefined || desc === undefined || price === undefined) {
    res.status(400).end();
    return;
  }
const product =  ProductController.addProduct(name,desc, price)
  .then((product) => {
    res.status(201).json(product);
  })
  .catch((err) => {
    res.status(500).end();
  });
});


productRouter.get('/allProduct', function(req,res){
  ProductController.getAllProduct()
  .then((products) => {
    res.status(201).json(products);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


productRouter.get('/allIngredientProduct/:id' , function(req,res){
  const id = req.params.id;

 ProductController.allIngredientProduct(id)
 .then((ingredients) =>{
   res.status(201).json(ingredients);
 })
 .catch((err) => {
   console.error(err);
   res.status(500).end();
 })
});

productRouter.get('/getProductById/:id' , function(req,res){
  ProductController.getProductById(req.params.id)
  .then((product) => {
    res.status(201).json(product);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


productRouter.get('/getProductByName/:name' , function(req,res){
  ProductController.getProductById(req.params.name)
  .then((product) => {
    res.status(201).json(product);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

productRouter.post('/addIngredient/:idProduct/:idIngredient' ,function(req,res){

  const idP = req.params.idProduct;
  const idI = req.params.idIngredient;

 ProductController.addIngredientInProductById(idP,idI)
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


productRouter.delete('/deleteIngredient/:idProduct/:idIngredient' , function(req,res){

  const idProduct = req.params.idProduct;
  const idIngredient = req.params.idIngredient;

  if(idProduct === undefined || idIngredient === undefined){
    res.status(500).end();
    return;
  }

    ProductController.deleteIngredientById(idProduct,idIngredient)
    .then(() => {
      const ing = ProductController.allIngredientProduct(idProduct)
      .then((ing) => {
        res.status(201).json(ing);
      })
      .catch((err) => {
        console.error(err);
      })
    })
});

productRouter.put('/updateIngredient' , function(req,res){
  const idIngredient = req.body.idIngredient;
  const idProduct = req.body.idProduct;
  const quantity = req.body.quantity;

  ProductController.updateQuantity(idProduct,idIngredient,quantity)
  .then(()=>{
    console.log("Mis à jour de l'ingrédient");
  })
  .catch((err) => {
    console.error(err);
  })
});



module.exports = productRouter;
