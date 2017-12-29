//考题表
const db = require('../db');
const Sequelize = require('sequelize');
var exam = db.defineModel('exam', {
    title : Sequelize.STRING(200),
    content : Sequelize.TEXT,
    type : Sequelize.INTEGER(9)
})

module.exports = exam;