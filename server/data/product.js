const Sequelize = require('sequelize');
const db = require('../db/mysql');
const Op = Sequelize.Op;

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
            defaultValue: 0,
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
            comment: '卖点'
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
            comment: '状态;0:失效;1:使用;99:删除'
        }
    },
    {
        freezeTableName: true,
        indexes: [
            {
                unique: false,
                fields: ['sku']
            }
        ]
    }
);

//强制初始化数据库
// Product.sync({ force: true });

/**
 * status=99，删除
 */
module.exports = {
    insert: function(model) {
        return Product.create(model);
    },
    getCount(limit = 1, opts = {}) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            where: {
                status: { [Op.not]: 99 }
            },
            order: [['id', 'desc']]
        };
        return Product.findAndCountAll(config);
    },
    find: function(id) {
        return Product.findOne({
            where: { id },
            order: [['id', 'desc']]
        });
    },
    update: function(model, id) {
        return Product.update(model, {
            where: {
                id
            }
        });
    },
    get: function(id) {
        return Product.findOne({
            where: {
                id
            }
        });
    },
    updateStatus: function(status, id) {
        return Product.update(
            { status },
            {
                where: {
                    id
                }
            }
        );
    },
    search(key = '', limit = 1) {
        let config = {
            limit: 20,
            offset: (limit - 1) * 20,
            where: {
                status: 1
            },
            order: [['id', 'desc']]
        };
        if (key) {
            config.where.title = {
                [Op.like]: '%' + key + '%'
            };
        }
        return Product.findAll(config);
    }
};
