const Sequelize = require('sequelize');
const db = require('../db/mysql');

const ProductInfo = db.define(
    't_search_product_info',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fid: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: '商品主id'
        },
        sku: {
            type: Sequelize.STRING(10),
            defaultValue: '',
            comment: 'sku'
        },
        spec: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '规格'
        },
        place: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '产地'
        },
        express: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '快递信息'
        },
        ship_area: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '发货区域'
        },
        after_sale: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '售后说明'
        },
        pack: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '包装'
        },
        txts: {
            type: Sequelize.TEXT,
            defaultValue: '',
            comment: '详情简介'
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
// ProductInfo.sync({ force: true });

module.exports = {
    insert: function(model) {
        return ProductInfo.create(model);
    },
    get: function(sku) {
        return ProductInfo.findOne({
            where: {
                sku
            }
        });
    }
};
