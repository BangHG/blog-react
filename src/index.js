// #21.5.4 라우트 모듈화
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser'); //#21.5.5.2 컨트롤러 파일작성

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); // api 라우트 적용

//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('4000 listening');
});
