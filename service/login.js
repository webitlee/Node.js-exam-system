//考上登录的事务管理
const dao = require('../import-middleware')('dao');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('login-service');
const login_dao = dao.login;
Sequelize.cls = namespace;
const sequelize = require('../constructor-sequelize');
function add_user(name, type, gender){
    sequelize.transaction((t)=>{
        return login_dao(name, type, gender);
    })
}

module.exports = add_user;