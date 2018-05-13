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

/*
MenuController.newMenu = function(name,description,productId , boissonId ){

  if(name === undefined || description === undefined || productId === undefined || boissonId === undefined ){
    return;
  }


const menu = this.add(name,description)
.then((menu)=>{
  return CompoMenu.create({
    boisson_id: boissonId,
    product_id: productId,
    menu_id : menu.id
  });

})
.catch((err) =>{
  console.error(err);
});

};
*/
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

MenuController.addTabProduct = function(idMenu , products){
  for(prod in products){
    MenuController.addProduct(idMenu,prod.id);
  }
};



MenuController.getAll = function(){
  return Menu.findAll()
    .catch(function(err){
      console.error(err);
    });
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