const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');
const ROLE = require('../../../shared/constants/roles');

const models = require('../../models');

const NotFoundError = require('../../errors/not-found-error');
const WrongPermissionsError = require('../../errors/wrong-permissions-error');

const config = require('../../config/auth.json');

const getFieldsFromObject = require('../../helpers/get-fields-from-object');

const router = new Router({ prefix: ROUTE.BASE });

router.post(ROUTE.USERS.ALL, async ctx => {
  const userData = getFieldsFromObject(ctx.request.body, models.User.fields);
  
  if (userData.role && (!ctx.user || ctx.user.role !== ROLE.ADMIN || userData.role !== ROLE.MANAGER)) {
    throw new WrongPermissionsError();
  }

  await models.User.create(userData);
});

router.post(ROUTE.USERS.LOGIN, async ctx => {
  const authData = getFieldsFromObject(ctx.request.body, models.User.fields);

  const password = bcrypt.hashSync(authData.password, config.token);

  const user = await models.User.findOne({ where: { email: authData.email, password } });

  if (!user) throw new NotFoundError();

  const token = jwt.sign({ email: user.email }, config.token);

  ctx.body = {
    data: { token, role: user.role },
  };
});

router.delete(ROUTE.USERS.SINGLE, async ctx => {
  const user = await models.User.findOne({ where: { id: ctx.params.id } });

  if (!user) throw new NotFoundError();
    
  await user.destroy();
});

module.exports = router;