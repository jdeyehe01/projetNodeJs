'use strict';

module.exports = function(sequelize , DataTypes){

const Order = sequelize.define('Order', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });

    Order.associate = _associate;
    return Order;
};

function _associate(models) {
  models.Order.hasMany(models.Menu, {
    as: 'Menus'
  });

};