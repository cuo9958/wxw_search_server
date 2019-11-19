const Router = require('koa-router');
const ProductModel = require('../data/product');

const router = new Router();

router.get('/', async function(ctx, next) {
    const { key, limit } = ctx.query;
    try {
        const data = await ProductModel.search(key, limit);
        ctx.body = {
            code: 1,
            data
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: error.message
        };
    }
});

exports.routers = router.routes();
