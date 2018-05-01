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

router.delete(ROUTE.SERVICES.SINGLE, async ctx => {
  try {
    const service = await models.Service.findOne({ where: { id: ctx.params.id } });
    
    await service.destroy();

    ctx.body = {
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.NOT_FOUND,
    };
  }
});

module.exports = router;