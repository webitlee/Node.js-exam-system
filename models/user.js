//用户表
const db = require('../db');
const Sequelize = require('sequelize');
var user = db.defineModel('user', {
    name : Sequelize.STRING(100),
    type : {
        type : Sequelize.INTEGER,
        unique : true
    },
    gender : Sequelize.BOOLEAN
})

module.exports = user;