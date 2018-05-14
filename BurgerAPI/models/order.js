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
        through: 'OrderCompo',
        foreignKey: 'menu_id'
    });
    models.Order.belongsToMany(models.Product, {
        as: 'products',
        through: 'OrderCompo',
        foreignKey: 'product_id'
    });
    models.Order.belongsToMany(models.Promotion, {
        as: 'promotions',
        through: 'OrderCompo',
        foreignKey: 'promotion_id'
    });

};