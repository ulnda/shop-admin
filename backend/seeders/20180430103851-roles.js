const DEFAULT_ROLES = [
  {
    code: 'admin',
    title: 'Administrator',
  },
  {
    code: 'manager',
    title: 'Manager',
  },
  {
    code: 'client',
    title: 'Client',
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', DEFAULT_ROLES, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
