const Sequelize = require('sequelize');
const db = require('../db/mysql');

const User = db.define(
    't_search_user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '用户昵称'
        },
        headimg: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '头像'
        },
        pwd: {
            type: Sequelize.STRING(50),
            defaultValue: '',
            comment: '密码'
        },
        tell: {
            type: Sequelize.STRING(20),
            defaultValue: '',
            comment: '电话'
        },
        finger: {
            type: Sequelize.STRING(100),
            defaultValue: '',
            comment: '指纹'
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            comment: '状态;0:失效;1:使用'
        }
    },
    {
        freezeTableName: true
    }
);

//强制初始化数据库
// User.sync({ force: true });

module.exports = {
    findTell(tell, pwd) {
        return User.findOne({
            where: {
                tell,
                pwd
            }
        });
    },
    findFinger(finger) {
        return User.findOne({
            where: {
                finger
            }
        });
    },
    //======
    insert: function(model) {
        return User.create(model);
    },
    find: function(username) {
        return User.findOne({
            where: {
                username
            }
        });
    },
    update: function(model, id) {
        return User.update(model, {
            where: {
                id
            }
        });
    },
    get: function(id) {
        return User.findOne({
            where: {
                id
            }
        });
    },
    getCount(limit = 1, opts = {}) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            order: [['status', 'desc'], ['id', 'desc']]
        };
        return User.findAndCountAll(config);
    },
    change: function(status, id) {
        const model = {
            status
        };
        return User.update(model, {
            where: {
                id
            }
        });
    }
};
