const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const ITEM_FIELDS = ['title', 'description', 'cost', 'ShopId'];

router.post(ROUTE.ITEMS.ALL, async ctx => {
  const itemData = getFieldsFromObject(ctx.request.body, ITEM_FIELDS);

  try {
    const shop = await models.Shop.findOne({ where: { id: itemData.ShopId } });

    if (!shop) {
      ctx.body = {
        status: HTTP_STATUS.NOT_FOUND,
      };

      return;
    }

    await models.Item.create(itemData);

    ctx.body = {
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

router.delete(ROUTE.ITEMS.SINGLE, async ctx => {
  try {
    const item = await models.Item.findOne({ where: { id: ctx.params.id } });
    
    await item.destroy();

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