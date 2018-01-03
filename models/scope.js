//考题类型表
const db = require('../db');
const Sequelize = require('sequelize');

var scope = db.defineModel('scope', {
    name : Sequelize.STRING(100)
})

module.exports = scope;