/**
 * 默认配置
 */

module.exports = {
    name: '服务',
    db: {
        host: '',
        port: '',
        database: '',
        user: '',
        password: '',
        connectionLimit: 2
    },
    redis: '',
    redisCluster: [],
    qiniu: {
        path: 'http://wxw.bxiaob.top', //静态文件的host
        accessKey: '',
        secretKey: '',
        scope: '086006'
    }
};
