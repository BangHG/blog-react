// #21.5.4 라우트 모듈화// #21.5.4 라우트 모듈화
const Router = require('koa-router');
const posts = require('./posts');

const api = new Router();

api.use('/posts', posts.routes());

module.exports = api;
