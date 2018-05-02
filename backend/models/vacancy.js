module.exports = (sequelize, DataTypes) => {
  const definition = {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    ShopId: DataTypes.INTEGER,
  };

  const Vacancy = sequelize.define('Vacancy', definition);

  Vacancy.fields = Object.keys(definition);

  Vacancy.associate = function(models) {
    models.Vacancy.belongsTo(models.Shop, {
      foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE',
      },
    });
  };

  return Vacancy;
};