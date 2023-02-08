//#21.5.5.2 컨트롤러 파일작성

let postId = 1; //id의 초깃값

//post 배열 초디데이터
const posts = [{ id: 1, title: '제목', body: '내용' }];

/* 
// 포스트 작성
POST /api/posts
{title, body}
*/
exports.write = (ctx) => {
  //REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/* 
// 포스트 목록 조회
GET /api/posts
*/
exports.list = (ctx) => {
  ctx.body = posts;
};
/* 
// 특정 포스트 조회
GET /api/posts/:id
*/
exports.read = (ctx) => {
  const { id } = ctx.params;
  //주어진 id값으로 포스트를 찾습니다. 파라미터로 받아온 값은 문자열 형식이므로, 숫자로 바꾸거나 비교할 p.id값을 문자열로 변경한다.
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다.',
    };
    return;
  }
  ctx.body = post;
};

/* 
// 특정 포스트 제거
DELETE /api/posts/:id
*/
exports.remove = (ctx) => {
  const { id } = ctx.params;
  // 해당 id를 가진 post index 찾기
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204; //no content
};

/* 
// 포스트 수정(교체)
PUT /api/posts/:id
{title, body}
*/
exports.replace = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다.',
    };
    return;
  }
  //전체 객체를 덮어씌웁니다. id를 제외한 정보를 날리고 객체를 새로만듭니다.
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/* 
// 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{title, body}
*/
exports.update = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않는 포스트입니다.',
    };
    return;
  }
  //기존 값에 정보를 덮어씌웁니다.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
