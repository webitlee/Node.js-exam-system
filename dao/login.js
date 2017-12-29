//处理考生登录的数据库操作
const model = require('../model')();
var user = model.user;
function add_user(name, type, gender){
    return user.create({
        name,
        type,
        gender,
        id : 1,
        score : 0,
        corrent : 0,
        mistakes : 0,
        createdTime : 0,
        midifyedTime : 0
    });
}

module.exports = add_user;