'use strict';

module.exports = function(sequelize , DataTypes){

const User = sequelize.define('User', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    User.associate = _associate;
    return User;
};

function _associate(models) {
  /*models.Product.hasMany(models.Ingredient, {
    as: 'ingredients'
  });

  models.Product.belongsToMany(models.Menu, {
    as: 'products',
    through: 'MenuProduct',
    foreignKey: 'product_id'
  });*/

};
