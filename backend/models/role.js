module.exports = (sequelize, DataTypes) => {
  const definition = {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
  };

  const Role = sequelize.define('Role', definition);

  Role.associate = models => models.Role.hasMany(models.User);

  return Role;
};