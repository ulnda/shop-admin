const ROLE = require('../../shared/constants/roles');

const DEFAULT_USERS = [{
  email: 'admin@admin.ru',
  password: '$2a$10$deU.WLTJXIk2OH.SqiYBz.OWQ2tMrQbBjuKEXC0e4DMSKJswqNZX6',
  role: ROLE.ADMIN,
}];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', DEFAULT_USERS, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
