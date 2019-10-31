const Sequelize = require('sequelize');
const db = require('../db/mysql');

const ProductImgs = db.define(
    't_search_product_imgs',
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
        img: {
            type: Sequelize.STRING,
            defaultValue: '',
            comment: '图片地址'
        },
        width: {
            type: Sequelize.INTEGER(10),
            defaultValue: 0,
            comment: '图片宽度'
        },
        height: {
            type: Sequelize.INTEGER(10),
            defaultValue: 0,
            comment: '图片高度'
        },
        od: {
            type: Sequelize.INTEGER(10),
            defaultValue: 0,
            comment: '排序'
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
// ProductImgs.sync({ force: true });

module.exports = {
    insert: function(model) {
        return ProductImgs.create(model);
    },
    get: function(sku) {
        return ProductImgs.findAll({
            where: {
                sku
            }
        });
    }
};
