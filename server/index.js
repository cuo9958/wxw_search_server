const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');
const AuthMiddleware = require('./middleware/auth');

require('./schedule');

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

app.use(AuthMiddleware);

const goods = require('./api/goods');
const user = require('./api/user');
const users = require('./api/users');
const upload = require('./api/upload');
const search = require('./api/search');
const test = require('./api/index');

router.use('/api/goods', goods.routers);
router.use('/api/user', user.routers);
router.use('/api/users', users.routers);
router.use('/api/upload', upload.routers);
router.use('/api/search', search.routers);
router.use('/api/test', test.routers);

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => console.error('server error', err));
const port = process.env.PORT || '8300';
app.listen(port, function() {
    console.log(`服务器运行在http://127.0.0.1:${port}`);
});
