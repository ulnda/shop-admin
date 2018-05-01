const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const router = new Router({ prefix: ROUTE.BASE });

router.get(ROUTE.CITIES.ALL, async ctx => {
  const cities = await models.City.findAll();

  ctx.body = {
    status: HTTP_STATUS.OK,
    data: cities,
  };
});

router.get(ROUTE.CITIES.AVAILABLE, async ctx => {
  const cities = await models.City.findAll({
    include: [
      { model: models.Shop, required: true, attributes: [] },
    ]
  });

  ctx.body = {
    status: HTTP_STATUS.OK,
    data: cities,
  };
});

router.get(ROUTE.CITIES.SHOPS, async ctx => {
  try {
    const shops = await models.Shop.findAll({ where: { CityId: ctx.params.id } });

    ctx.body = {
      status: HTTP_STATUS.OK,
      data: shops,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.NOT_FOUND,
    };
  }
});

module.exports = router;