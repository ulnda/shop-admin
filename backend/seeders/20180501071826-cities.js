const CITIES = require('cities.json');
const RUSSIAN_CITIES = CITIES
  .filter(city => city.country === 'RU')
  .map(({ name, lat, lng }) => ({ name, lat, lng }));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', RUSSIAN_CITIES, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
