const Koa = require('koa');
const koaBody = require('koa-body');
const auth = require('./middlewares/auth');

const usersRoutes = require('./routes/v1/users');
const shopsRoutes = require('./routes/v1/shops');
const itemsRoutes = require('./routes/v1/items');
const citiesRoutes = require('./routes/v1/cities');
const newsRoutes = require('./routes/v1/news');
const servicesRoutes = require('./routes/v1/services');
const vacanciesRoutes = require('./routes/v1/vacancies');

const PORT = 3000;

const app = new Koa();

app.use(koaBody());

app.use(auth);
app.use(usersRoutes.routes());
app.use(shopsRoutes.routes());
app.use(itemsRoutes.routes());
app.use(citiesRoutes.routes());
app.use(servicesRoutes.routes());
app.use(newsRoutes.routes());
app.use(vacanciesRoutes.routes());

app.listen(PORT);