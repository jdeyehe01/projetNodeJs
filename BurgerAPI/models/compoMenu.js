module.exports = function (sequelize, DataTypes) {
    const CompoMenu = sequelize.define('CompoMenu', null, {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });
    CompoMenu.associate = _associate;
    CompoMenu.removeAttribute('id');
    return CompoMenu;
};


function _associate(models) {

  models.CompoMenu.belongsTo(models.Produit);
  models.CompoMenu.belongsTo(models.Menu);
  models.CompoMenu.belongsTo(models.Boisson);

};
