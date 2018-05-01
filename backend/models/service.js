module.exports = (sequelize, DataTypes) => {
  const definition = {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  };

  const Service = sequelize.define('Service', definition);
  
  return Service;
};