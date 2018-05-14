const ModelIndex = require('../models');
const Order = ModelIndex.Order;

const OrderController = function() {};

OrderController.addOrder = function(name){
  return Order.create({
    name: name
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

OrderController.updateOrder = function(idOrder, newName, newUserId) {
  const order = Order.find({
    where:{
      id: idOrder
    }
  });

  if(order === undefined){
    return;
  }

  if(newName === undefined) {
    newName = order.name;
  }

  if(newUserId === undefined) {
      //newUserId = order.use;
  }

  order.updateAttributes({
    name: newName
  });

  return order;
};

OrderController.getAllOrder = function(){
  return Order.findAll()
  .catch((err) => {
    console.error(err);
  });
};

module.exports = OrderController;