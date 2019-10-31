/**
 * 鉴权相关
 */
const LRU = require('lru-cache');
const Redis = require('../db/redis');
const UserModel = require('../data/user');
const generate = require('nanoid/non-secure/generate');

function getGuid() {
    return generate('123456789abcdefghijklmnpqrstuvwxyz', 12);
}

const caches = new LRU({
    maxAge: 864000000,
    updateAgeOnGet: true
});

module.exports = {
    /**
     * 指纹鉴权
     * @param {*} finger
     * @param {*} token
     */
    async authFingle(finger, token) {
        const key = 'finger_' + finger + '_' + token;
        let model = {};
        if (caches.has(key)) {
            model = caches.get(key);
        } else {
            try {
                const dot = await Redis.get(key);
                model = JSON.parse(dot);
                caches.set(key, model);
            } catch (error) {
                console.log(error);
            }
        }
        return model;
    },
    /**
     * 电话☎️鉴权
     * @param {*} tell
     * @param {*} token
     */
    async authTell(tell, token) {
        const key = 'tell_' + tell + '_' + token;
        let model = {};
        if (caches.has(key)) {
            model = caches.get(key);
        } else {
            try {
                const dot = await Redis.get(key);
                model = JSON.parse(dot);
                caches.set(key, model);
            } catch (error) {
                console.log(error);
            }
        }
        return model;
    },
    /**
     * 手机号，密码登录
     * @param {*} tell
     * @param {*} pwd
     */
    async tellLogin(tell, pwd) {
        const data = await UserModel.findTell(tell, pwd);
        if (!data) throw new Error('用户未注册');
        const token = getGuid();
        const key = 'tell_' + tell + '_' + token;
        const userModel = {
            id: data.id,
            nickname: data.nickname,
            headimg: data.headimg,
            tell: data.tell,
            status: data.status,
            finger: data.finger
        };
        Redis.set(key, JSON.stringify(userModel));
        caches.set(key, userModel);
        return userModel;
    },
    /**
     * 指纹登录
     * @param {*} finger
     */
    async fingerLogin(finger) {
        let data = await UserModel.findFinger(finger);
        if (!data)
            data = await UserModel.insert({
                finger
            });
        const token = getGuid();
        const key = 'finger_' + finger + '_' + token;
        const userModel = {
            id: data.id,
            nickname: data.nickname,
            headimg: data.headimg,
            tell: data.tell,
            status: data.status,
            finger: data.finger
        };
        Redis.set(key, JSON.stringify(userModel));
        caches.set(key, userModel);
        return userModel;
    },
    /**
     * 检查指纹的合法性
     * @param {*} finger
     */
    checkFinger(finger, accept) {
        if (finger.length < 10) return false;
        if (accept.length < 10) return false;
        return true;
    }
};
