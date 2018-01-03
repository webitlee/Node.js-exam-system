//考生登录的事务管理
const dao = require('../import-middleware')('dao');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('login-service');
const login_dao = dao.login;
Sequelize.cls = namespace;
const sequelize = require('../constructor-sequelize');
//添加考生信息
function add_user(name, type, gender){
    sequelize.transaction((t)=>{
        return login_dao.add_user(name, type, gender);
    })
}

//获取考题类型
async function get_types(){
    var types = null;
    await sequelize.transaction(async(t)=>{
        await login_dao.get_types().then((result)=>{
            types = result;
        })
    })
    return types;
}

module.exports = {
    add_user,
    get_types
}