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
      var newPrice = order.price + product.price;
      OrderController.updateOrder(order.id,newPrice);
      console.log('ajout produit');

      return product.updateAttributes({
        order_id: idOrder
      });
    })
  })
};

OrderController.addMenu = function(idOrder, idMenu){
  return Order.findById(idOrder)
  .then((order) => {
    return Menu.findById(idMenu)
    .then((menu) => {
      var newPrice = order.price + menu.price;
      OrderController.updateOrder(order.id,newPrice);
      console.log('ajout menu');

      return menu.updateAttributes({
        order_id: idOrder
      });

    })
  })
};

OrderController.addPromotion = function(idOrder, idPromotion){
  return Order.findById(idOrder)
  .then((order) => {
    return Promotion.findById(idPromotion)
    .then((promotion) => {
      var newPrice = order.price + promotion.price;
      OrderController.updateOrder(order.id,newPrice);
      console.log('ajout promo');
      return promotion.updateAttributes({
      order_id: idOrder
    });
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
    return Product.find({
      where:{
        id: idProduct,
        order_id: idOrder
      }
    })
    .then((product) => {
      var newPrice = order.price - product.price;
      OrderController.updateOrder(order.id,newPrice);
      return product.destroy();
    })
  })
};

OrderController.deleteMenu = function(idOrder, idMenu){
  return Order.findById(idOrder)
  .then((order)=>{
    return Menu.find({
      where: {
        id: idMenu,
        order_id: idOrder
      }
    })
    .then((menu) => {
      var newPrice = order.price - menu.price;
      OrderController.updateOrder(order.id,newPrice);
      return menu.destroy();
    })
  })
};

OrderController.deletePromotion = function(idOrder, idPromotion){
  return Order.findById(idOrder)
  .then((order)=>{
    return Promotion.find({
      where: {
        id: idPromotion,
        order_id: idOrder
      }
    })
    .then((promotion) => {
      var newPrice = order.price - promotion.price;
      OrderController.updateOrder(order.id,newPrice);
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
  return Order.find({
    where:{
      id: idOrder
    }
  })
  .then((order)=>{
    console.log(newPrice);
    if(newPrice === undefined) {
      newPrice = order.price;
    }
      return order.updateAttributes({
        price: newPrice
      });

  })
  .catch((err)=>{
      console.error(err);
  });

};

module.exports = OrderController;
