/**
 * 鉴权相关
 */
const AuthService = require('../services/auth');

module.exports = async function auth(ctx, next) {
    ctx.user = null;
    ctx.isLogin = false;
    const token = ctx.header.token;
    if (ctx.header.finger) {
        ctx.user = await AuthService.authFingle(ctx.header.finger, token);
    }
    if (ctx.header.tell) {
        ctx.user = await AuthService.authTell(ctx.header.finger, token);
    }
    if (ctx.user) {
        ctx.isLogin = true;
    }
    next();
};
