const Router = require('koa-router');
const AuthMiddleware = require('../middleware/auth');
const AuthService = require('../services/auth');

const router = new Router();

/**
 * 获取用户信息
 */
router.get('/', AuthMiddleware, function(ctx, next) {
    if (ctx.isLogin) {
        ctx.body = {
            code: 1,
            data: ctx.user
        };
    } else {
        ctx.body = {
            code: 0,
            msg: '用户未登录'
        };
    }
});
/**
 * 鉴权
 */
router.get('/auth', AuthMiddleware, function(ctx, next) {
    if (ctx.isLogin) {
        ctx.body = {
            code: 1,
            data: ''
        };
    } else {
        ctx.body = {
            code: 0,
            msg: '用户未登录'
        };
    }
});
/**
 * 手机号密码登录
 */
router.all('/login', async function(ctx, next) {
    const tell = ctx.request.body.tell || ctx.query.tell || '';
    const pwd = ctx.request.body.pwd || ctx.query.pwd || '';
    try {
        const res = await AuthService.tellLogin(tell, pwd);
        ctx.body = {
            code: 1,
            data: res
        };
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});
/**
 * 指纹登录
 */
router.post('/singer', async function(ctx, next) {
    const finger = ctx.request.body.finger || ctx.query.finger || '';
    try {
        const res = await AuthService.fingerLogin(finger);
        ctx.body = {
            code: 1,
            data: res
        };
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});

exports.routers = router.routes();
