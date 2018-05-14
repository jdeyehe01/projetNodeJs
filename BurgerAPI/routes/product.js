const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const ProductController = controllers.ProductController;
const IngredientController = controllers.IngredientController;
const jwt = require('jsonwebtoken');

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post('/', function(req, res) {
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const name = req.body.name;
      const desc = req.body.description;
      const price = parseFloat(req.body.price);

      if(name === undefined || desc === undefined || price === undefined) {
        res.status(400).end();
        return;
      }
    ProductController.addProduct(name,desc, price)
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        res.status(403).end();
      });
    }
  });
});

productRouter.put('/updateProduct' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
  if(err){
    res.status(403);
  }
  else{
    const idProduct = req.body.idProduct;
    const name = req.body.name;
    const description = req.body.description;
    const unitPrice = req.body.unitPrice;

    UserController.updateUser(idProduct, name, description, unitPrice)
    .then(()=>{
      console.log("Le produit à été mis à jour");
    })
    .catch((err) => {
      console.error(err);
    })
  }});
});

productRouter.get('/allProduct', function(req,res){
  ProductController.getAllProduct()
  .then((products) => {
    res.status(201).json(products);
  })
  .catch((err) => {
    console.error(err);
    res.status(403).end();
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
   res.status(403).end();
 })
});

productRouter.get('/getProductById/:id' , function(req,res){
  ProductController.getProductById(req.params.id)
  .then((product) => {
    res.status(201).json(product);
  })
  .catch((err) => {
    console.error(err);
    res.status(403).end();
  })
});


productRouter.get('/getProductByName/:name' , function(req,res){

  const name = req.params.name;
  if(name === undefined ){
    res.status(403).end();
    return;
  }
  ProductController.getProductById(name)
  .then((product) => {
    res.status(201).json(product);
  })
  .catch((err) => {
    console.error(err);
    res.status(403).end();
  })
});

productRouter.post('/addIngredient/:idProduct/:idIngredient' ,function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const idP = parseInt(req.params.idProduct);
      const idI = parseInt(req.params.idIngredient);

      if(idP === undefined || idI === undefined ){
        res.status(403).end();
        return;
      }
     ProductController.addIngredientInProductById(idP,idI)
     .then(() => {
       const ingredients = ProductController.allIngredientProduct(idP)
       .then((ingredients) =>{
         res.status(201).json(ingredients);
       })
       .catch((err) => {
         console.error(err);
         res.status(403).end();
       })
     })
     .catch((err) =>{
       console.error(err);
     });
    }
  });
});


productRouter.delete('/deleteIngredient/:idProduct/:idIngredient' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
  if(err){
    res.status(403);
  }
  else{
      const idProduct = req.params.idProduct;
      const idIngredient = req.params.idIngredient;

      if(idProduct === undefined || idIngredient === undefined){
        res.status(403).end();
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
    }
  });
});

productRouter.put('/updateIngredient' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      const idIngredient = parseInt(req.body.idIngredient);
      const idProduct = parseInt( req.body.idProduct);
      const quantity =parseFloat( req.body.quantity);

      ProductController.updateQuantity(idProduct,idIngredient,quantity)
      .then(()=>{
        console.log("Mis à jour de l'ingrédient");
      })
      .catch((err) => {
        console.error(err);
      })
    }
  });
});

//On crée un produit et un ingrédient en même temps


productRouter.post('/addProductAndIngredient' , function(req,res){
  const token = req.headers["authorization"];
jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403);
    }
    else{
      //Attribut d'un produit
        const nameP = req.body.nameProduct;
        const descP = req.body.descriptionProduct;
        const priceP = parseFloat(req.body.priceProduct);

        //Attribut d'un ingredient
        const nameI = req.body.nameIngredient;
        const typeI = req.body.typeIngredient;
        const quantity = parseFloat(req.body.quantityIgredient);

        if(nameP === undefined || descP === undefined || priceP === undefined|| nameI === undefined|| quantity === undefined || typeI ===undefined){
          res.status(403).end();
          return;
        }

        ProductController.addProduct(nameP,descP, priceP)
        .then((product) => {
          IngredientController.addFindOrCreateIngredient(nameI, typeI , quantity , product.id)
          .then(()=>{
            res.status(201).json(product)
          })
          .catch((err)=>{
            console.error(err);
          })
        })
        .catch((err)=> {
          console.error(err);
        });
      }
    });
});



module.exports = productRouter;
