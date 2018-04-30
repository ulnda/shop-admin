const Koa = require('koa');
const koaBody = require('koa-body');

const usersRoutes = require('./routes/v1/users');

const PORT = 3000;

const app = new Koa();

app.use(koaBody());

app.use(usersRoutes.routes());

app.listen(PORT);