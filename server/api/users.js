const Router = require('koa-router');
const AuthMiddleware = require('../middleware/auth');
const LoginMiddleware = require('../middleware/login');
const UserModel = require('../data/user');

const router = new Router();
/**
 * 获取用户列表
 */
router.get('/', AuthMiddleware, async (ctx, next) => {
    const pageIndex = ctx.query.pageIndex;
    try {
        const data = await UserModel.getCount(pageIndex);
        ctx.body = {
            code: 1,
            data
        };
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 0,
            data: error
        };
    }
});

exports.routers = router.routes();
