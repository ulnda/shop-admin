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
    SINGLE: '/shops/:id',
    VACANCIES: '/shops/:id/vacancies',
    ITEMS: '/shops/:id/items',
  },
  VACANCIES: {
    ALL: '/vacancies',
    SINGLE: '/vacancies/:id',
  },
  ITEMS: {
    ALL: '/items',
    SINGLE: '/items/:id',
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
