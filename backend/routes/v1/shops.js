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

    if (!city) {
      ctx.body = {
        status: HTTP_STATUS.NOT_FOUND,
      };

      return;
    }
    
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

router.get(ROUTE.SHOPS.VACANCIES, async ctx => {
  try {
    const vacancies = await models.Vacancy.findAll({ where: { ShopId: ctx.params.id } });

    ctx.body = {
      status: HTTP_STATUS.OK,
      data: vacancies,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.NOT_FOUND,
    };
  }
});

router.get(ROUTE.SHOPS.ITEMS, async ctx => {
  try {
    const items = await models.Item.findAll({ where: { ShopId: ctx.params.id } });

    ctx.body = {
      status: HTTP_STATUS.OK,
      data: items,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.NOT_FOUND,
    };
  }
});

router.delete(ROUTE.SHOPS.SINGLE, async ctx => {
  try {
    const shop = await models.Shop.findOne({ where: { id: ctx.params.id } });
    
    await shop.destroy();

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