//处理考生登录的数据库操作
const model = require('../import-middleware')();
var user = model.user;
var scope = model.scope;
//添加考生信息
async function add_user(name, scope, gender){
    var id = null;
    let obj = {
        name,
        gender,
        scope_id : scope
    };
    await user.create(obj).then((result)=>{
        id = result.id;
        console.log(JSON.stringify(result));
    });
    return id;
}

//获取考题类型
async function get_scopes(){
    var data = null;
    await scope.findAll({
        attributes : ['id', 'name']
    }).then((result)=>{
        data = [];
        for(let i =0; i < result.length; i++){
            data[i] = {};
            data[i]['id'] = result[i].dataValues.id;
            data[i]['name'] = result[i].dataValues.name;
        }
    })
    return data;
}

module.exports = {
    add_user,
    get_scopes
}