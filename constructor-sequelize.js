//创建一个已配置的Sequelize实例
const Sequelize = require('sequelize');
const config = require('./config');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host : config.host,
    port : config.port,
    dialect : config.dialect,
    pool : {
        max : 10,
        min : 0,
        idle : 10000
    }
})

module.exports = sequelize;