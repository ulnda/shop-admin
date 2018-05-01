module.exports = (sequelize, DataTypes) => {
  const definition = {
    type: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING
  };

  const Shop = sequelize.define('Shop', definition);

  Shop.associate = models => {
    models.Shop.belongsTo(models.City, {
      foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE',
      },
    });

    models.Shop.hasMany(models.Vacancy);
  };

  return Shop;
};