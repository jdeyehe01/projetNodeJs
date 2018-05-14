'use strict';

module.exports = function(sequelize , DataTypes){

const Promotion = sequelize.define('Promotion', {

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
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
},
  {
    paranoid: false,
    underscored: true,
    freezeTableName: true
});
  Promotion.associate = _associate;
  return Promotion;
};


function _associate(models) {

  models.Promotion.belongsToMany(models.Order, {
    as: 'orders',
    through: 'OrderCompo',
    foreignKey: 'promotion_id'
  });

  models.Promotion.hasMany(models.Menu, {
    as: 'menus'
  });

  models.Promotion.hasMany(models.Product, {
    as: 'products'
  });
}
