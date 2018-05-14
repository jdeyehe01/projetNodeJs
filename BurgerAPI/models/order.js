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
    models.Order.belongsToMany(models.Menu, {
        as: 'menus',
        through: 'OrderMenu',
        foreignKey: 'order_menu_id'
    });
    models.Order.belongsToMany(models.Product, {
        as: 'products',
        through: 'OrderProduct',
        foreignKey: 'order_product_id'
    });
    models.Order.belongsToMany(models.Promotion, {
        as: 'promotions',
        through: 'OrderPromotion',
        foreignKey: 'order_promotion_id'
    });

};