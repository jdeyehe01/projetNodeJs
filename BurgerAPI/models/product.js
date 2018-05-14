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
    unitPrice : {
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

  models.Menu.belongsTo(models.Promotion);


  models.Product.belongsToMany(models.Menu, {
    as: 'products',
    through: 'MenuProduct',
    foreignKey: 'product_id'
  });

  models.Product.belongsToMany(models.Order, {
    as: 'orders',
    through: 'OrderCompo',
    foreignKey: 'product_id'
  });

}