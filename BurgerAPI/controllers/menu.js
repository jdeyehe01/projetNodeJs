const ModelIndex = require('../models');
const controllers = require('../controllers');
const Menu = ModelIndex.Menu;
const Product = ModelIndex.Product;

const MenuController = function() {};

MenuController.add = function(name,description,price){
  return Menu.create({
    name: name,
    description: description,
    price : price
  });
};


MenuController.getMenuById = function(idMenu){
  return Menu.findById(idMenu)
  .then((menu) => {
    console.log('menu trouvé');
    return menu;
  })
  .catch((error) => {
    console.error(err);
  });
};


MenuController.findOrCreateMenu = function(name,description,price,idPromotion){
  return Menu.findOrCreate({
      where: {
        name: name
      },
      defaults:{
        name: name,
        description: description,
        price: price,
        promotion_id: idPromotion
      }
    })
    .catch((err)=>{
      console.error(err);
    });
}


MenuController.addProduct = function(idMenu,idProduct){
  return Menu.find({
    where: {
      id: idMenu
    }
  })
  .then((menu) => {
    return Product.find({
      where:{
        id: idProduct
      }
    })
    .then((product) => {
      return menu.addProduct(product);
    })
  })
};

MenuController.deleteProduct = function(idMenu,idProduct){
return Menu.findById(idMenu)
.then((menu)=>{
  return Product.findById(idProduct)
  .then((product) => {
    return product.destroy();
  })
})

};


MenuController.getAllMenu = function(){
  return Menu.findAll()
    .catch((err)=>{
      console.error(err);
    });
};

MenuController.getMenuCompo = function(idMenu){
  return Menu.findById(idMenu)
  .then((menu) =>{
    return menu.getProducts();
  })
};


MenuController.getById = function(id){
return Menu.findById(id);
}


MenuController.getByName = function(name){
  return Menu.find({
      where: {
        name: name
      }
  }).then(function(menu){
    if(menu){
      console.log("Menu trouvé");
      return Menu;
    }else{
      console.log("Menu non trouvé ! ");
      return undefined;
    }
  }).catch(function(err){
    console.error(err);
  })
}



MenuController.deleteMenu = function(idMenu){

  Menu.findById(idMenu)
  .then((menu) =>{
    menu.destroy();
    console.log('Menu suprimé ! ');
  })

}
module.exports = MenuController;
