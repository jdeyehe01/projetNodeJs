'use strict';

module.exports = function(sequelize , DataTypes){

const Order = sequelize.define('Order', {

        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
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
    as: 'OrderMenus'
  });

  models.Order.hasMany(models.Product, {
    as: 'OrderProducts'
  });

  models.Order.hasMany(models.Promotion, {
    as: 'OrderPromotions'
  });

};
