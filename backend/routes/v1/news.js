const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const NotFoundError = require('../../errors/not-found-error');

const getFieldsFromObject = require('../../helpers/get-fields-from-object');

const router = new Router({ prefix: ROUTE.BASE });

router.get(ROUTE.NEWS.ALL, async ctx => {
  const news = await models.News.findAll();

  ctx.body = {
    data: news,
  };
});

router.post(ROUTE.NEWS.ALL, async ctx => {
  const newsData = getFieldsFromObject(ctx.request.body, models.News.fields);

  await models.News.create(newsData);
});

router.delete(ROUTE.NEWS.SINGLE, async ctx => {
  const news = await models.News.findOne({ where: { id: ctx.params.id } });

  if (!news) throw new NotFoundError();
    
  await news.destroy();
});

module.exports = router;