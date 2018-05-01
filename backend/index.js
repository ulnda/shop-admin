const Koa = require('koa');
const koaBody = require('koa-body');
const auth = require('./middlewares/auth');

const usersRoutes = require('./routes/v1/users');
const shopsRoutes = require('./routes/v1/shops');
const citiesRoutes = require('./routes/v1/cities');

const PORT = 3000;

const app = new Koa();

app.use(koaBody());

app.use(auth);
app.use(usersRoutes.routes());
app.use(shopsRoutes.routes());
app.use(citiesRoutes.routes());

app.listen(PORT);