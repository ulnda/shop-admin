const jwt = require('jsonwebtoken');
const pathToRegexp = require('path-to-regexp')

const config = require('../config/auth.json');

const models = require('../models');

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
  
  await next();
};