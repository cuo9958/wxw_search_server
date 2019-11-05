const Router = require('koa-router');
const ProductModel = require('../data/product');
const ProductInfo = require('../data/product_info');
const ProductImgs = require('../data/product_imgs');

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

router.get('/:id', async function(ctx, next) {
    try {
        const data = await ProductModel.get(ctx.params.id);

        const info = await ProductInfo.get(data.sku);
        // TODO:去掉
        if (info.txts.indexOf('static.086006.com') > 0) {
            info.txts = info.txts.replace(/static\.086006\.com/g, 'wxw.bxiaob.top');
            info.save();
        }
        const imgs = await ProductImgs.get(data.sku);
        const model = {
            ...data.dataValues,
            ...info.dataValues,
            imgs: imgs
        };
        ctx.body = {
            code: 1,
            data: model
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