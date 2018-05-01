const Koa = require('koa');
const koaBody = require('koa-body');

const path = require('path');
const fs = require('fs');

const auth = require('./middlewares/auth');

const ROUTES_FOLDER = 'routes/v1';

const PORT = 3000;

const app = new Koa();

app.use(koaBody());
app.use(auth);

addRoutes();

app.listen(PORT);

function addRoutes() {
  const routesFolder = path.join(__dirname, ROUTES_FOLDER);

  fs
    .readdirSync(routesFolder)
    .forEach(file => {
      const routesFile = require(path.join(routesFolder, file));
      app.use(routesFile.routes());
    });
}