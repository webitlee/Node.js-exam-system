//待办事项表
const db = require('../db');
const Sequelize = require('sequelize');

var todo = db.defineModel('todo', {
    option : Sequelize.STRING(100)
})

module.exports = todo;