const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const NotFoundError = require('../../errors/not-found-error');

const getFieldsFromObject = require('../../helpers/get-fields-from-object');

const router = new Router({ prefix: ROUTE.BASE });

router.get(ROUTE.SERVICES.ALL, async ctx => {
  const services = await models.Service.findAll();

  ctx.body = {
    data: services,
  };
});

router.post(ROUTE.SERVICES.ALL, async ctx => {
  const serviceData = getFieldsFromObject(ctx.request.body, models.Service.fields);

  await models.Service.create(serviceData);
});

router.delete(ROUTE.SERVICES.SINGLE, async ctx => {
  const service = await models.Service.findOne({ where: { id: ctx.params.id } });

  if (!service) throw new NotFoundError();

  await service.destroy();
});

module.exports = router;