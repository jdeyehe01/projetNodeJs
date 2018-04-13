'use strict';

module.exports = function(sequelize , DataTypes){

const Produit = sequelize.define('Produit', {

    id : {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name :{
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    paranoid: true,
    underscored: true,
    freezeTableName: true
});
  Produit.associate = _associate;
  return Produit;
};


function _associate(models) {
  models.Produit.hasMany(models.Ingredient, {
    as: 'ingredients'
  });
}
