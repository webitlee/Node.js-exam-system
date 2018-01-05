//待办事项状态的数据库操作
const model = require('../import-middleware')();
const todo_status = model.todo_status;

//添加状态
function add_status(name){
    todo_status.create({
        name
    })
}

//根据id删除事项状态
function remove_status(id){
    todo_status.findById(id).then((result)=>{
        result.destroy();
    })
}

//根据id修改事项状态名称
function update_status(id, name){
    todo_status.findById(id).then((result)=>{
        result.name = name;
        result.save();
    })
}

//查找所有状态
async function get_all_status(offset, limit){
    var status = null;
    await todo_status.findAndCount({
        offset,
        limit
    }).then((result)=>{
        status = result;
    })
    return status;
}

module.exports = {
    add_status,
    get_all_status,
    update_status,
    remove_status
}