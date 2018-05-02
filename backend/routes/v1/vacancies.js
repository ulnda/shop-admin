const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const NotFoundError = require('../../errors/not-found-error');

const getFieldsFromObject = require('../../helpers/get-fields-from-object');

const router = new Router({ prefix: ROUTE.BASE });

router.post(ROUTE.VACANCIES.ALL, async ctx => {
  const vacancyData = getFieldsFromObject(ctx.request.body, models.Vacancy.fields);

  const shop = await models.Shop.findOne({ where: { id: vacancyData.ShopId } });

  if (!shop) throw new NotFoundError();

  await models.Vacancy.create(vacancyData);
});

router.delete(ROUTE.VACANCIES.SINGLE, async ctx => {
  const vacancy = await models.Vacancy.findOne({ where: { id: ctx.params.id } });

  if (!shop) throw new NotFoundError();
    
  await vacancy.destroy();
});

module.exports = router;