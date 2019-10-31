const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new Router();

app.use(
    KoaBody({
        multipart: true,
        formidable: {
            maxFieldsSize: 5 * 1024 * 1024
        }
    })
);
const test = require('./api/index');
router.use('/api/test', test.routers);

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => console.error('server error', err));
const port = process.env.PORT || '8200';
app.listen(port, function() {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
