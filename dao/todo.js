//处理待办事项的数据库操作
const model = require('../import-middleware')();
const todo = model.todo;
const todo_status = model.todo_status;

//添加待办事项
function add_todo(option, statusId){
    todo.create({
        option,
        status_id : statusId
    })
}

//根据id删除待办事项
function remove_todo(id){
    todo.findById(id).then((result)=>{
        result.destroy();
    })
}

//根据id修改待办事项
function update_todo(id, option, statusId){
    todo.findById(id).then((result)=>{
        result.option = option;
        result.status_id = statusId
        result.save();
    })
}

//获取待办事项列表
async function get_todos(offset, limit){
    var todos = null;
    await todo.findAndCount({
        offset,
        limit,
        order : [['id', 'DESC']],
        include : {
            model : todo_status
        }
    }).then((result)=>{
        todos = result;
    })
    return todos;
}

module.exports = {
    add_todo,
    get_todos,
    remove_todo,
    update_todo
}

