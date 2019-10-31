const Sequelize = require('sequelize');
const db = require('../db/mysql');

const Product = db.define(
    't_search_product',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fid: {
            type: Sequelize.INTEGER,
            comment: '复制来源id'
        },
        sku: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: 'sku'
        },
        pre: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '前缀，卖点'
        },
        name: {
            type: Sequelize.STRING(20),
            defaultValue: '',
            comment: '埋点'
        },
        title: {
            type: Sequelize.STRING(100),
            defaultValue: '',
            comment: '标题'
        },
        des: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '简介'
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '主图'
        },
        price: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '价格'
        },
        unit: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: '单位'
        },
        status: {
            type: Sequelize.TINYINT(2),
            defaultValue: 0,
            comment: '状态;0:失效;1:使用'
        }
    },
    {
        freezeTableName: true
    }
);

//强制初始化数据库
// Product.sync({ force: true });

module.exports = {
    insert: function(model) {
        return Product.create(model);
    }
};
