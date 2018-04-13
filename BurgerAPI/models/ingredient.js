module.exports = function(sequelize , DataTypes){

  const Ingredient = sequelize.define('Ingredient' , {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement : true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeIngredient: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantite: {
        type: DataTypes.BIGINT,
      }
  }, {
      paranoid: false,
      underscored: true,
      freezeTableName: true
  });
  Ingredient.associate = _association;
  return Ingredient;
};


function _association(models){
  models.Ingredient.belongsTo(models.Produit);
};
