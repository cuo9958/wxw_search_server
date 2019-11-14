const Router = require('koa-router');
const AuthService = require('../services/auth');

const router = new Router();


/**
 * 获取用户信息
 */
router.get('/', function(ctx, next) {
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
router.get('/auth', function(ctx, next) {
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
router.all('/finger', async function(ctx, next) {
    const finger = ctx.request.body.finger || ctx.query.finger || '';
    try {
        if (!AuthService.checkFinger(finger, ctx.header.accept)) {
            return (ctx.body = {
                code: 0,
                msg: '不合法的注册'
            });
        }
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
