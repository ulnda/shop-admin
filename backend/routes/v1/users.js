const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');
const ROLE = require('../../../shared/constants/roles');

const models = require('../../models');

const config = require('../../config/auth.json');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const USER_FIELDS = ['email', 'password', 'role'];

router.post(ROUTE.USERS.ALL, async ctx => {
  const userData = getFieldsFromObject(ctx.request.body, USER_FIELDS);
  
  if (userData.role && (!ctx.user || ctx.user.role !== ROLE.ADMIN || userData.role !== ROLE.MANAGER)) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_PERMISSIONS,
    };

    return;
  }

  try {
    await models.User.create(userData);

    ctx.body = {
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

router.post(ROUTE.USERS.LOGIN, async ctx => {
  try {
    const authData = getFieldsFromObject(ctx.request.body, USER_FIELDS);

    const password = bcrypt.hashSync(authData.password, config.token);

    const user = await models.User.findOne({ where: { email: authData.email, password } });

    if (!user) {
      ctx.body = {
        status: HTTP_STATUS.NOT_FOUND,
      };

      return;
    }

    const token = jwt.sign({ email: user.email }, config.token);

    ctx.body = {
      status: HTTP_STATUS.OK,
      data: { token, role: user.role },
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

module.exports = router;