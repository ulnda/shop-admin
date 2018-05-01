const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const SERVICE_FIELDS = ['title', 'description'];

router.get(ROUTE.SERVICES.ALL, async ctx => {
  const services = await models.Service.findAll();

  ctx.body = {
    status: HTTP_STATUS.OK,
    data: services,
  };
});

router.post(ROUTE.SERVICES.ALL, async ctx => {
  const serviceData = getFieldsFromObject(ctx.request.body, SERVICE_FIELDS);

  try {
    await models.Service.create(serviceData);

    ctx.body = {
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

module.exports = router;