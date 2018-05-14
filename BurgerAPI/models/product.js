'use strict';

module.exports = function(sequelize , DataTypes){

const Product = sequelize.define('Product', {

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
    },
    price : {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    paranoid: false,
    underscored: true,
    freezeTableName: true
});
  Product.associate = _associate;
  return Product;
};


function _associate(models) {
  models.Product.hasMany(models.Ingredient, {
    as: 'ingredients'
  });

  models.Product.belongsTo(models.Promotion);
  models.Product.belongsTo(models.Order);



  models.Product.belongsToMany(models.Menu, {
    as: 'products',
    through: 'MenuProduct',
    foreignKey: 'product_id'
  });


}
