const Router = require('koa-router');
const ProductModel = require('../data/product');
const ProductInfo = require('../data/product_info');
// const ProductImgs = require('../data/product_imgs');
const generate = require('nanoid/non-secure/generate');

const router = new Router();
function getGuid() {
    return generate('0123456789abcdefghijklmnpqrstuvwxyz', 10);
}

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
//保存
router.post('/', async function(ctx, next) {
    const data = ctx.request.body;

    let sku = data.sku;
    if (!sku) sku = getGuid();
    const model_product = {
        id: data.id || 0,
        sku,
        pre: data.pre,
        name: data.name,
        title: data.title,
        des: data.des,
        image: data.image,
        price: data.price,
        unit: data.unit
    };
    const model_info = {
        sku,
        spec: data.spec,
        place: data.place,
        express: data.express,
        ship_area: data.ship_area,
        after_sale: data.after_sale,
        pack: data.pack,
        txts: data.txts
    };

    try {
        if (data.id) {
            ProductModel.update(model_product);
            ProductInfo.update(model_info);
        } else {
            ProductModel.insert(model_product);
            ProductInfo.insert(model_info);
        }
        ctx.body = {
            code: 1
            // data
        };
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 0,
            msg: e.message
        };
    }
});
//上下架
router.post('/updown/:id/:status', async function(ctx, next) {
    const { id, status } = ctx.params;
    try {
        const data = await ProductModel.updateStatus(status * 1 === 1 ? 0 : 1, id);
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
//删除
router.post('/del/:id', async function(ctx, next) {
    const { id } = ctx.params;
    try {
        const data = await ProductModel.updateStatus(99, id);
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

//详情
router.get('/:id', async function(ctx, next) {
    try {
        const data = await ProductModel.get(ctx.params.id);

        const info = await ProductInfo.get(data.sku);
        // TODO:去掉
        if (info.txts.indexOf('static.086006.com') > 0) {
            info.txts = info.txts.replace(/static\.086006\.com/g, 'wxw.bxiaob.top');
            info.save();
        }
        // const imgs = await ProductImgs.get(data.sku);
        const model = {
            ...data.dataValues,
            ...info.dataValues
            // imgs: imgs
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
