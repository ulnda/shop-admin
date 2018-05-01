const Router = require('koa-router');

const HTTP_STATUS = require('../../../shared/constants/http-statuses');
const ROUTE = require('../../../shared/constants/routes');

const models = require('../../models');

const getFieldsFromObject = require('../../helpers/getFieldsFromObject');

const router = new Router({ prefix: ROUTE.BASE });

const NEWS_FIELDS = ['title', 'description'];

router.get(ROUTE.NEWS.ALL, async ctx => {
  const news = await models.News.findAll();

  ctx.body = {
    status: HTTP_STATUS.OK,
    data: news,
  };
});

router.post(ROUTE.NEWS.ALL, async ctx => {
  const newsData = getFieldsFromObject(ctx.request.body, NEWS_FIELDS);

  try {
    await models.News.create(newsData);

    ctx.body = {
      status: HTTP_STATUS.OK,
    };
  } catch (error) {
    ctx.body = {
      status: HTTP_STATUS.WRONG_FIELDS,
    };
  }
});

router.delete(ROUTE.NEWS.SINGLE, async ctx => {
  try {
    const news = await models.News.findOne({ where: { id: ctx.params.id } });
    
    await news.destroy();

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