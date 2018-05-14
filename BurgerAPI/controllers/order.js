const ModelIndex = require('../models');
const Order = ModelIndex.Order;

const OrderController = function() {};

OrderController.addOrder = function(orderPrice){
  return Order.create({
    price: orderPrice
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