const Produit = function(id,name,description, ingredients){
  this.id = id;
  this.name = name || "Inconnue";
  this.description = description || "Inconnue"
  this.ingredients = ingredients || [];

};

module.exports = Produit;
