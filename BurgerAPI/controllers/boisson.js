const ModelIndex = require('../models');
const Boisson = ModelIndex.Boisson;

const BoissonController = function() {};

BoissonController.add = function(name,volume){
  return Boisson.create({
    name: name,
    volume: volume
  });
};

BoissonController.getAll = function(){
  return Boisson.findAll()
    .catch(function(err){
      console.error(err);
    });
};


BoissonController.getById = function(id){
return Boisson.find({
    where: {
      id: id
    }
  }).then(function(boisson){
    if(boisson){
      console.log("la boisson a été trouvé");
      return boisson;
    }else{
      console.log("la boisson n'a pas été trouvé ! ");
    }
  }).catch(function(err){
    console.error(err);
  })
}


BoissonController.getByName = function(name){
  return Boisson.find({
      where: {
        name: name
      }
  }).then(function(boisson){
    if(boisson){
      console.log("Boisson trouvé");
      return Boisson;
    }else{
      console.log("Boisson non trouvé ! ");
      return undefined;
    }
  }).catch(function(err){
    console.error(err);
  })
}
module.exports = BoissonController;
