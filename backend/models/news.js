module.exports = (sequelize, DataTypes) => {
  const definition = {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  };

  const News = sequelize.define('News', definition);

  News.fields = Object.keys(definition);
  
  return News;
};