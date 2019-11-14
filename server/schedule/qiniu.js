const CronJob = require('cron').CronJob;
const QiniuServer = require('../services/qiniu');

new CronJob('* */10 * * * *', function() {
    QiniuServer.updateToken();
}).start();
