module.exports = function(sequelize , DataTypes){
  
    const Ingredient = sequelize.define('Ingredient' , {
  
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement : true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        ingredientType: {
          type: DataTypes.STRING,
          allowNull: false
        },
        quantity: {
          type: DataTypes.FLOAT,
        },
        unitPrice : {
          type: DataTypes.FLOAT,
          allowNull: true
        }
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true
    });
    Ingredient.associate = _association;
    return Ingredient;
  };
  
  function _association(models){
    models.Ingredient.belongsTo(models.Product);
  };