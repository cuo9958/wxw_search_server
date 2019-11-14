const Router = require('koa-router');
const fs = require('fs');
const LoginMiddleware = require('../middleware/login');
const QiniuServer = require('../services/qiniu');
const path = require('path');

const router = new Router();

router.post('/', async function(ctx, next) {
    ctx.body = '不存在的接口';
    const file = ctx.request.files.file;
    if (!file) {
        return (ctx.body = {
            code: 0,
            msg: '请选择文件'
        });
    }
    const sr = fs.createReadStream(file.path);

    const fileName = Date.now() + Math.round(Math.random() * 1000) + path.extname(file.name);
    try {
        const data = await QiniuServer.uploadStream(fileName, sr, 'product/');
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
