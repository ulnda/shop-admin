module.exports = (sequelize, DataTypes) => {
  const definition = {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  };

  const News = sequelize.define('News', definition);
  
  return News;
};