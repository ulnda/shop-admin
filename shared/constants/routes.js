module.exports = {
  BASE: '/api',
  USERS: {
    ALL: '/users',
    LOGIN: '/users/login',
    SINGLE: '/users/:id',
  },
  CITIES: {
    ALL: '/cities',
    AVAILABLE: '/cities/available',
    SHOPS: '/cities/:id/shops'
  },
  SHOPS: {
    ALL: '/shops',
    VACANCIES: '/shops/:id/vacancies',
    SINGLE: '/shops/:id',
  },
  VACANCIES: {
    ALL: '/vacancies',
    SINGLE: '/vacancies/:id',
  },
  NEWS: {
    ALL: '/news',
    SINGLE: '/news/:id',
  },
  SERVICES: {
    ALL: '/services',
    SINGLE: '/services/:id',
  },
};
