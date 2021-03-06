const jwt = require('jsonwebtoken');
const pathToRegexp = require('path-to-regexp')

const config = require('../config/auth.json');

const WrongSessionError = require('../errors/wrong-session-error'); 
const WrongPermissionsError = require('../errors/wrong-permissions-error');

const ROUTE = require('../../shared/constants/routes');
const ROLE = require('../../shared/constants/roles');
const HTTP_STATUS = require('../../shared/constants/http-statuses');
const HTTP_METHOD = require('../../shared/constants/http-methods');

const models = require('../models');

const REQUEST_PERMISSIONS = [
  { URL: ROUTE.CITIES.ALL, METHOD: HTTP_METHOD.GET, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },

  { URL: ROUTE.USERS.SINGLE, METHOD: HTTP_METHOD.DELETE, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  
  { URL: ROUTE.SHOPS.ALL, METHOD: HTTP_METHOD.POST, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.SHOPS.SINGLE, METHOD: HTTP_METHOD.DELETE, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.SHOPS.ITEMS, METHOD: HTTP_METHOD.GET, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.SHOPS.VACANCIES, METHOD: HTTP_METHOD.GET, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  
  { URL: ROUTE.VACANCIES.ALL, METHOD: HTTP_METHOD.POST, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.VACANCIES.SINGLE, METHOD: HTTP_METHOD.DELETE, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },

  { URL: ROUTE.ITEMS.ALL, METHOD: HTTP_METHOD.POST, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.ITEMS.SINGLE, METHOD: HTTP_METHOD.DELETE, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  
  { URL: ROUTE.NEWS.ALL, METHOD: HTTP_METHOD.POST, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.NEWS.SINGLE, METHOD: HTTP_METHOD.DELETE, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  
  { URL: ROUTE.SERVICES.ALL, METHOD: HTTP_METHOD.POST, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
  { URL: ROUTE.SERVICES.SINGLE, METHOD: HTTP_METHOD.DELETE, ROLES: [ROLE.ADMIN, ROLE.MANAGER] },
];

function getJwtToken({ authorization }) {
  if (!authorization) return null;

  const headerParts = authorization.split(' ');

  if (headerParts.length === 2 && headerParts[0] === 'Bearer') return headerParts[1];

  return null;
}

async function getUser(token) {
  try {
    const { email } = jwt.verify(token, config.token);
    return await models.User.findOne({ where: { email } });
  } catch (error) {
    return null;
  }
}

module.exports = async (ctx, next) => {
  ctx.user = await getUser(getJwtToken(ctx.request.header));

  const requestInfo = REQUEST_PERMISSIONS.find(item => {
    const requestRegExp = pathToRegexp(`${ROUTE.BASE}${item.URL}`);
    return requestRegExp.test(ctx.request.url) && item.METHOD ===ctx.request.method.toLowerCase();
  });

  if (requestInfo && !ctx.user) throw new WrongSessionError();

  if (requestInfo && !requestInfo.ROLES.includes(ctx.user.role)) throw new WrongPermissionsError();

  await next();
};