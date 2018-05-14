'use strict';

module.exports = function(sequelize , DataTypes){

const Menu = sequelize.define('Menu', {

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
  Menu.associate = _associate;
  return Menu;
};

function _associate(models) {
  models.Menu.belongsToMany(models.Product, {
    as: 'products',
    through: 'MenuProduct',
    foreignKey: 'menu_id'
  });

  models.Menu.belongsToMany(models.Order, {
    as: 'orders',
    through: 'OrderCompo',
    foreignKey: 'menu_id'
  });

  models.Menu.belongsTo(models.Promotion);
}