const HTTP_STATUS = require('../../shared/constants/http-statuses');

const NotFoundError = require('../errors/not-found-error');
const WrongSessionError = require('../errors/wrong-session-error'); 
const WrongPermissionsError = require('../errors/wrong-permissions-error'); 

function getStatusByError(error) {
  switch (error.name) {
    case NotFoundError.name:
      return HTTP_STATUS.NOT_FOUND;
    case WrongPermissionsError.name:
      return HTTP_STATUS.WRONG_PERMISSIONS;
    case WrongSessionError.name:
      return HTTP_STATUS.WRONG_SESSION_ID;
    case 'SequelizeDatabaseError':
    case 'SequelizeValidationError':
      return HTTP_STATUS.WRONG_FIELDS;
    default:
      return HTTP_STATUS.UNIDENTIFIED_ERROR;
  }
}

module.exports = async (ctx, next) => {
  try {
    await next();

    ctx.body = {
      ...ctx.body,
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: getStatusByError(error),
    };
  }
};