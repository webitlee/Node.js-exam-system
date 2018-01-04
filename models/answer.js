//答案表
const db = require('../db');
const Sequelize = require('sequelize');

let answer = db.defineModel('answer', {
    option : Sequelize.STRING(100),
    is_right : Sequelize.BOOLEAN
})

module.exports = answer;