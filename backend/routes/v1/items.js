const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const NotFoundError = require('../../errors/not-found-error');

const getFieldsFromObject = require('../../helpers/get-fields-from-object');

const router = new Router({ prefix: ROUTE.BASE });

router.post(ROUTE.ITEMS.ALL, async ctx => {
  const itemData = getFieldsFromObject(ctx.request.body, models.Item.fields);

  const shop = await models.Shop.findOne({ where: { id: itemData.ShopId } });

  if (!shop) throw new NotFoundError();

  await models.Item.create(itemData);
});

router.delete(ROUTE.ITEMS.SINGLE, async ctx => {
  const item = await models.Item.findOne({ where: { id: ctx.params.id } });

  if (!item) throw new NotFoundError();

  await item.destroy();
});

module.exports = router;