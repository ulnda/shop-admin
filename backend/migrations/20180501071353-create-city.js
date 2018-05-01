module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lat: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      lng: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cities');
  }
};