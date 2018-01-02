//用户表
const db = require('../db');
const Sequelize = require('sequelize');
var user = db.defineModel('user', {
    name : Sequelize.STRING(100),
    gender : Sequelize.BOOLEAN,
    score : {
        type : Sequelize.INTEGER.UNSIGNED,
        defaultValue : 0
    },
    correct : {
        type : Sequelize.INTEGER.UNSIGNED,
        defaultValue : 0
    },
    mistake : {
        type :Sequelize.INTEGER.UNSIGNED,
        defaultValue : 0,
    },
    type_id : {
        type : Sequelize.BIGINT,
        references : {
            model : 'type',
            key : 'id'
        }
    }
})

module.exports = user;