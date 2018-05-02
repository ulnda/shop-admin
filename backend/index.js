const Koa = require('koa');
const koaBody = require('koa-body');

const path = require('path');
const fs = require('fs');

const ROUTES_FOLDER = 'routes/v1';
const MIDDLEWARES_FOLDER = 'middlewares';

const PORT = 3000;

const app = new Koa();

app.use(koaBody());

getModules(MIDDLEWARES_FOLDER).forEach(file => app.use(file));
getModules(ROUTES_FOLDER).forEach(file => app.use(file.routes()));

app.listen(PORT);

function getModules(folderPath) {
  const absFolderPath = path.join(__dirname, folderPath);

  return fs
    .readdirSync(absFolderPath)
    .map(file => require(path.join(absFolderPath, file)));
}