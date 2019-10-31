const Router = require('koa-router');
const ProductModel = require('../data/product');

const router = new Router();

router.get('/', async function(ctx, next) {
    const { pageindex } = ctx.query;
    try {
        const data = await ProductModel.getCount(pageindex);
        ctx.body = {
            code: 1,
            data
        };
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 0,
            msg: e.message
        };
    }
});

router.get('/:id', function(ctx, next) {
    ctx.body = '详情' + ctx.params.id;
});

exports.routers = router.routes();
