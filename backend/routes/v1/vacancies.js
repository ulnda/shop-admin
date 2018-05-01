const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const VACANCY_FIELDS = ['title', 'description', 'ShopId'];

router.post(ROUTE.VACANCIES.ALL, async ctx => {
  const vacancyData = getFieldsFromObject(ctx.request.body, VACANCY_FIELDS);

  try {
    const shop = await models.Shop.findOne({ where: { id: vacancyData.ShopId } });

    if (!shop) {
      ctx.body = {
        status: HTTP_STATUS.NOT_FOUND,
      };

      return;
    }

    await models.Vacancy.create(vacancyData);

    ctx.body = {
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

router.delete(ROUTE.VACANCIES.SINGLE, async ctx => {
  try {
    const vacancy = await models.Vacancy.findOne({ where: { id: ctx.params.id } });
    
    await vacancy.destroy();

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