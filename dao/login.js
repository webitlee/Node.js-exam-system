//处理考生登录的数据库操作
const model = require('../import-middleware')();
var user = model.user;
var type = model.type;
function add_user(name, type, gender){
    let obj = {
        name,
        gender,
        type_id : type
    };
    return user.create(obj);
}

module.exports = add_user;