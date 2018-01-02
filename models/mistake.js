//错题表
const db = require('../db');
const Sequelize = require('sequelize');

var mistake = db.defineModel('mistake', {});

module.exports = mistake;