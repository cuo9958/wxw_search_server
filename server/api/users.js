const Router = require('koa-router');
const LoginMiddleware = require('../middleware/login');
const UserModel = require('../data/user');

const router = new Router();
/**
 * 获取用户列表
 */
router.get('/', async (ctx, next) => {
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
router.get('/:id', async (ctx, next) => {
    const id = ctx.params.id || '';
    try {
        if (!id) throw new Error('不存在的用户');
        const data = await UserModel.get(id);
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
