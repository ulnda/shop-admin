const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const NotFoundError = require('../../errors/not-found-error');

const getFieldsFromObject = require('../../helpers/get-fields-from-object');

const router = new Router({ prefix: ROUTE.BASE });

router.post(ROUTE.SHOPS.ALL, async ctx => {
  const shopData = getFieldsFromObject(ctx.request.body, models.Shop.fields);

  const city = await models.City.findOne({ where: { id: shopData.CityId } });

  if (!city) throw new NotFoundError();

  await models.Shop.create(shopData);
});

router.get(ROUTE.SHOPS.VACANCIES, async ctx => {
  const vacancies = await models.Vacancy.findAll({ where: { ShopId: ctx.params.id } });

  ctx.body = {
    data: vacancies,
  };
});

router.get(ROUTE.SHOPS.ITEMS, async ctx => {
  const items = await models.Item.findAll({ where: { ShopId: ctx.params.id } });

  ctx.body = {
    data: items,
  };
});

router.delete(ROUTE.SHOPS.SINGLE, async ctx => {
  const shop = await models.Shop.findOne({ where: { id: ctx.params.id } });

  if (!shop) throw new NotFoundError();

  await shop.destroy();
});

module.exports = router;