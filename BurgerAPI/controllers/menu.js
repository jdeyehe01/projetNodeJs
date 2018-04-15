const ModelIndex = require('../models');
const controllers = require('../controllers');
const Menu = ModelIndex.Menu;
const b = ModelIndex.Boisson;
const p = ModelIndex.Produit;
const CompoMenu = ModelIndex.CompoMenu;


const MenuController = function() {};

MenuController.add = function(name,description){
  return Menu.create({
    name: name,
    description: description
  });
};


MenuController.newMenu = function(name,description,produitId , boissonId ){

  if(name === undefined || description === undefined || produitId === undefined || boissonId === undefined ){
    return;
  }


const menu = this.add(name,description)
.then((menu)=>{
  return CompoMenu.create({
    boisson_id: boissonId,
    produit_id: produitId,
    menu_id : menu.id
  });

})
.catch((err) =>{
  console.error(err);
});

};

MenuController.getAll = function(){
  return Menu.findAll()
    .catch(function(err){
      console.error(err);
    });
};


MenuController.getById = function(id){
return Menu.find({
    where: {
      id: id
    }
  }).then(function(menu){
    if(menu){
      console.log("la menu a été trouvé");
      return menu;
    }else{
      console.log("la menu n'a pas été trouvé ! ");
    }
  }).catch(function(err){
    console.error(err);
  })
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
module.exports = MenuController;
