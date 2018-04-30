const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const config = require('../../config/auth.json');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const USER_FIELDS = ['email', 'password'];

router.post(ROUTE.USERS.LOGIN, async ctx => {
  try {
    const authData = getFieldsFromObject(ctx.request.body, USER_FIELDS);

    const password = bcrypt.hashSync(authData.password, config.token);

    const user = await models.User.findOne({ where: { email: authData.email, password } }, {
      include: [models.Role]
    });

    if (!user) {
      ctx.body = {
        status: HTTP_STATUS.NOT_FOUND,
      };

      return;
    }

    const role = await user.getRole();
    const token = jwt.sign({ email: user.email }, config.token);

    ctx.body = {
      status: HTTP_STATUS.OK,
      data: { token, role: role.code },
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

module.exports = router;