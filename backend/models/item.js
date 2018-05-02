module.exports = (sequelize, DataTypes) => {
  const definition = {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    ShopId: DataTypes.INTEGER,
  };

  const Item = sequelize.define('Item', definition);

  Item.fields = Object.keys(definition);
  
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