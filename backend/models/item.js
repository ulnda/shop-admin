module.exports = (sequelize, DataTypes) => {
  const definition = {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
  };

  const Item = sequelize.define('Item', definition);
  
  Item.associate = function(models) {
    models.Item.belongsTo(models.Shop, {
      foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE',
      },
    });
  };

  return Item;
};