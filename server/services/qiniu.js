const qiniu = require('qiniu');
const redisClient = require('../db/redis');
const config = require('config');

const qiniu_config = config.qiniu;
let uploadToken = '';
//获取七牛上传的token
async function getToken() {
    if (!uploadToken) {
        Server.updateToken();
    }
    return uploadToken;
}
const Server = {
    updateToken() {
        const mac = new qiniu.auth.digest.Mac(qiniu_config.accessKey, qiniu_config.secretKey);
        const options = {
            scope: qiniu_config.scope
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        uploadToken = putPolicy.uploadToken(mac);
        redisClient.set('qiniu_086006_wxw', uploadToken);
    },
    uploadStream: async function(filename, readableStream, prefix = 'test/') {
        const uploadToken = await getToken();
        const qnconfig = new qiniu.conf.Config();
        qnconfig.zone = qiniu.zone.Zone_z1;
        const formUploader = new qiniu.form_up.FormUploader(qnconfig);
        const putExtra = new qiniu.form_up.PutExtra();
        return new Promise((resolve, reject) => {
            formUploader.putStream(uploadToken, prefix + filename, readableStream, putExtra, function(err, respBody, respInfo) {
                console.log(err, respBody, respInfo);
                if (err) {
                    return reject(err);
                }
                if (respInfo.statusCode === 200) {
                    resolve({
                        filename: filename,
                        path: qiniu_config.path,
                        url: qiniu_config.path + '/' + prefix + filename
                    });
                } else {
                    reject(new Error('上传失败' + respInfo.statusCode));
                }
            });
        });
    }
};
module.exports = Server;
