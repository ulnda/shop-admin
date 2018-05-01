module.exports = (sequelize, DataTypes) => {
  const definition = {
    name: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
  };

  const City = sequelize.define('City', definition);

  City.associate = models => models.City.hasMany(models.Shop);

  return City;
};