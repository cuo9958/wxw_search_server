const Router = require('koa-router');
const UserModel = require('../data/user');

const router = new Router();

router.get('/', function(ctx, next) {
    ctx.body = '获取用户信息';
});

router.get('/auth', function(ctx, next) {
    ctx.body = '鉴权';
});

router.post('/login', function(ctx, next) {
    ctx.body = '手机号密码登录';
});

router.post('/singer', function(ctx, next) {
    ctx.body = '指纹登录';
});



exports.routers = router.routes();
