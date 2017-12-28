//用户表
const db = require('./db');
const Sequlize = require('sequelize');
var user = db.defineModel('user', {
    name : Sequlize.STRING(100),
    type : {
        type : Sequlize.INTEGER,
        unique : true
    },
    gender : Sequlize.BOOLEAN
})