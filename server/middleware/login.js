/**
 * 登录判定
 */
module.exports = async function auth(ctx, next) {
    if (ctx.isLogin) {
        await next();
    } else {
        ctx.body = {
            code: 0,
            msg: '用户未登录'
        };
    }
};
