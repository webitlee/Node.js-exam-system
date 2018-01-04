//待办事项状态
const db = require('../db');
const Sequelize = require('sequelize');

var todo_status = db.defineModel('todo_status', {
    name : Sequelize.STRING(50)
})

module.exports = todo_status;