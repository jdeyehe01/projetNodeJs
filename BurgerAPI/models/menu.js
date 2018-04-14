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
  models.Menu.hasMany(models.CompoMenu, {
    as: 'Menu_CompoMenu'
  });
}
