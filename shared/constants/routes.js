module.exports = {
  BASE: '/api',
  USERS: {
    ALL: '/users',
    LOGIN: '/users/login',
  },
  CITIES: {
    ALL: '/cities',
    AVAILABLE: '/cities/available',
    SHOPS: '/cities/:id/shops'
  },
  SHOPS: {
    ALL: '/shops',
    VACANCIES: '/shops/:id/vacancies'
  },
  VACANCIES: {
    ALL: '/vacancies',
  },
  NEWS: {
    ALL: '/news',
  },
  SERVICES: {
    ALL: '/services',
  },
};
