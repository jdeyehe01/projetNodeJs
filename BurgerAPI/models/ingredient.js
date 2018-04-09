const Ingredient = function(name, type , quantite) {
    this.name = name || "Inconnue";
    this.type = type ||  "Inconnue";
    this.quantite = quantite || 0;
  };

module.exports = Ingredient;
