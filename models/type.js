//考题类型表
const db = require('../db');
const Sequelize = require('sequelize');

var type = db.defineModel('type', {
    name : Sequelize.STRING(100)
})

module.exports = type;