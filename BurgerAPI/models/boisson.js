module.exports = function(sequelize , DataTypes){

  const Boisson = sequelize.define('Boisson' , {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement : true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      volume: {
        type: DataTypes.BIGINT,
      }
  }, {
      paranoid: false,
      underscored: true,
      freezeTableName: true
  });
  //Boisson.associate = _association;
  return Boisson;
};

/*
function _association(models){
  models.Boisson.belongsTo(models.Menu);
};
*/
