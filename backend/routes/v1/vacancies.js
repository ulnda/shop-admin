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
    await models.Shop.findOne({ where: { id: vacancyData.ShopId } });

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

module.exports = router;