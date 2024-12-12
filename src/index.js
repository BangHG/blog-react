// #21.5.4 라우트 모듈화
require('dotenv').config();// #22 mongoose를 이용한 mongoDB연동 실습
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser'); //#21.5.5.2 컨트롤러 파일작성
const mongoose = require('mongoose')//22.3.2 mongoose로 서버와 데이터베이스연결

const api = require('./api');

//비구조화 할당을 통해 precoess.env 내부 값에 대한 레퍼런스 만들기
const {PORT,MONGO_URI} = process.env;

mongoose.connect(MONGO_URI).then(()=>{
  console.log('몽고DB연결');
}).catch(e=>{
  console.error(e)
})
/* 
<!-- 230209 수정 -->
하 몽고디비 설치에서 막혔다.
아무리해도안된다,.,..,,..,.
 */


const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); // api 라우트 적용

//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('listening to port %d',port);  
});
