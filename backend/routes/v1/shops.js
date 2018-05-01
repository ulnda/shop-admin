const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');
const SHOP_TYPE = require('../../../shared/constants/shop-types');

const models = require('../../models');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const SHOP_FIELDS = ['type', 'lat', 'lng', 'address', 'phone', 'CityId'];

router.post(ROUTE.SHOPS.ALL, async ctx => {
  const shopData = getFieldsFromObject(ctx.request.body, SHOP_FIELDS);

  try {
    const city = await models.City.findOne({ where: { id: shopData.CityId } });
    
    if (!Object.values(SHOP_TYPE).includes(shopData.type)) {
      ctx.body = {
        status: HTTP_STATUS.WRONG_FIELDS,
      };

      return;
    }

    await models.Shop.create(shopData);

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