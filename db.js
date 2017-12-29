//定义Model

const config = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host : config.host,
    port : config.port,
    dialect : config.dialect,
    pool : {
        max : 10,
        min : 0,
        idle : 10000
    }
})
//默认id类型
const ID_TYPE = Sequelize.BIGINT;
//默认不为空
const IS_NULL = false;

function defineModel(name, attributes){
    var attrs = {};
    for(let attr in attributes){
        let values = attributes[attr];
        if(typeof values === 'object' && values['type']){
            values.allowNull = values.allowNull || IS_NULL;
            attrs[attr] = values;
        }else{
            attrs[attr] = {
                type : values,
                allowNull : IS_NULL
            }
        }
    }
    attrs.id = {
        type : ID_TYPE,
        allowNull : IS_NULL,
        primaryKey : true,
        autoIncrement : true
    };
    attrs.createdTime = {
        type : Sequelize.BIGINT,
        allowNull : IS_NULL
    };
    attrs.modifiedTime = {
        type : Sequelize.BIGINT,
        allowNull : IS_NULL
    };
    return sequelize.define(name, attrs, {
        tableName : name,
        timestamps : false,
        hooks : {
            beforeValidate(obj){
                const now = new Date().getTime();
                obj.createdTime = now;
                obj.modifiedTime = now;
            }
        }
    })
}


module.exports = {
    defineModel : defineModel
}