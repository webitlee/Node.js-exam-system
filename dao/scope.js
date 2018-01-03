//处理考题范围数据库操作
const model = require('../import-middleware')();
var scope = model.scope;

//添加考题范围
function add_scope(name){
    var obj = {
        name
    }
    return scope.create(obj);
}

//获取所有考题范围
async function get_scopes(){
    var scopes = [];
    await scope.findAll({
        attributes : ['id', 'name']
    }).then((result)=>{
        for(let i = 0; i < result.length; i++){
            scopes[i] = {
                id : result[i].id,
                name : result[i].name
            }; 
        }
    })
    return scopes;
}

//修改考题范围名称
function edit_scope(id, name){
    scope.findById(id).then((result)=>{
        result.name = name;
        result.modifiedTime = new Date().getTime();
        result.save();
    })
}

//输出考题范围
function remove_scope(id){
    scope.findById(id).then((result)=>{
        result.destroy();
    })
}

module.exports = {
    add_scope,
    get_scopes,
    edit_scope,
    remove_scope
}