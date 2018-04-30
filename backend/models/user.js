const bcrypt = require('bcrypt');

const config = require('../config/auth.json');

module.exports = (sequelize, DataTypes) => {
  const definition = {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  const User = sequelize.define('User', definition);

  User.associate = models => {
    models.User.belongsTo(models.Role, {
      foreignKey: {
        allowNull: false,
        onDelete: 'CASCADE',
      },
    });
  };

  User.hook('beforeCreate', (user, options) => {
    user.password = bcrypt.hashSync(user.password, config.token);
  });

  User.hook('beforeUpdate', (user, options) => {
    if (options.fields.includes('password')) {
      user.password = bcrypt.hashSync(user.password, config.token);
    }
  });

  return User;
};