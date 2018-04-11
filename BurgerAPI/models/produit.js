module.exports = function(sequelize , DataTypes){

  const Produit = sequelize.define('Produit' , {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement : true
      },
      name: {
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

//  Produit.associate = _association;
  return Produit;
};


function _association(models){
  models.Produit.belongsToMany(models.Ingredient, {
    as: 'ingredients',
    through: 'ProduitIngredient',
    foreignKey: 'ingredient_id'
  });
};
