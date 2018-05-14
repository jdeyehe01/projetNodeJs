const ModelIndex = require('../models');
const controllers = require('../controllers');
const Order = ModelIndex.Order;

const Menu = ModelIndex.Menu;
const Product = ModelIndex.Product;
const Promotion = ModelIndex.Promotion;

const OrderController = function() {};

OrderController.addOrder = function(orderPrice){
  return Order.create({
    price: orderPrice
  })
};

OrderController.addProduct = function(idOrder, idProduct){
  return Order.findById(idOrder)
  .then((order) => {
    return Product.findById(idProduct)
    .then((product) => {
      //const newPrice = order.price + product.price;
      //order.updateOrder(idOrder, newPrice);
      return order.addProduct(product);
    })
  })
};

OrderController.addMenu = function(idOrder, idMenu){
  return Order.findById(idOrder)
  .then((order) => {
    return Menu.findById(idMenu)
    .then((menu) => {
      return order.addMenu(menu);
    })
  })
};

OrderController.addPromotion = function(idOrder, idPromotion){
  return Order.findById(idOrder)
  .then((order) => {
    return Promotion.findById(idPromotion)
    .then((promotion) => {
      return order.addMenu(promotion);
    })
  })
};

OrderController.deleteOrder = function(idOrder){
  return Order.destroy({
    where:{
      id: idOrder
    }
  })
  .then(() => {
      console.log("La commande à été supprimée.");
    })
    .catch((err) => {
      console.error(err);
    })
};

OrderController.deleteProduct = function(idOrder, idProduct){
  return Order.findById(idOrder)
  .then((order)=>{
    return Product.findById(idProduct)
    .then((product) => {
      return product.destroy();
    })
  })
};

OrderController.deleteMenu = function(idOrder, idMenu){
  return Order.findById(idOrder)
  .then((order)=>{
    return Menu.findById(idMenu)
    .then((menu) => {
      return menu.destroy();
    })
  })
};

OrderController.deletePromotion = function(idOrder, idPromotion){
  return Order.findById(idOrder)
  .then((order)=>{
    return Promotion.findById(idPromotion)
    .then((promotion) => {
      return promotion.destroy();
    })
  })
};

OrderController.getOrderById = function(orderId){
  return Order.find({
    where: {
      id: orderId
    }
  })
  .then((order) => {
    console.log('Commande trouvée');
    return order;
  })
  .catch((error) => {
    console.error(err);
  });
};

OrderController.getAllOrder = function(){
  return Order.findAll()
  .catch((err) => {
    console.error(err);
  });
};


OrderController.updateOrder = function(idOrder, newPrice) {
  const order = Order.find({
    where:{
      id: idOrder
    }
  });

  if(order === undefined){
    return;
  }

  if(newPrice === undefined) {
    newPrice = order.price;
  }

  order.updateAttributes({
    price: newPrice
  });

  return order;
};

module.exports = OrderController;