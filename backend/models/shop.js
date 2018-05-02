const SHOP_TYPE = require('../../shared/constants/shop-types');

module.exports = (sequelize, DataTypes) => {
  const definition = {
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    CityId: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [Object.values(SHOP_TYPE)],
      },
    }
  };

  const Shop = sequelize.define('Shop', definition);

  Shop.fields = Object.keys(definition);

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