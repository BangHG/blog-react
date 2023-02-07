// #21.5.4 라우트 모듈화
const Koa = require('koa');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); // api 라우트 적용

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('4000 listening');
});
