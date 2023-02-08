// #21.5.5 post 라우트 생성
const Router = require('koa-router');
const posts = new Router();
const postsCtrl = require('./posts.ctrl'); // #21.5.5.1 Postman의 설치 및 사용:  이런것을 모아서 따로 분리 관리하면 그 파일을 '컨트롤러'라 한다.

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

// 포스트 작성
posts.get('/', postsCtrl.list);
// 포스트 목록 조회
posts.post('/', postsCtrl.write);
// 특정 포스트 조회
posts.get('/:id', postsCtrl.read);
// 특정 포스트 제거
posts.delete('/:id', postsCtrl.remove);
// 포스트 수정(교체)
posts.put('/:id', postsCtrl.replace);
// 포스트 수정(특정 필드 변경)
posts.patch('/:id', postsCtrl.update);

module.exports = posts;
