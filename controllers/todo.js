//处理待办事项的数据接口
const dao = require('../import-middleware')('dao');
const todo_dao = dao.todo;

//添加待办事项
var add_todo = async (ctx, next)=>{
    var responseData = {
        message : '添加待办事项失败'
    }
    try{
        let option = ctx.request.body.option;
        let statusId = ctx.request.body.statusId;
        if(!option){
            responseData.message = '事项名称不合法';
            throw new Error();
        }
        if(statusId <= 0 || isNaN(statusId)){
            responseData.message = '事件状态id不合法';
            throw new Error();
        }
        await todo_dao.add_todo(option, statusId);
        responseData.message = '添加待办事项成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//根据id删除待办事项
var remove_todo = async (ctx, next)=>{
    var responseData = {
        message : '删除待办事项失败'
    }
    try{
        let id = ctx.request.body.id;
        await todo_dao.remove_todo(id);
        responseData.message = '删除待办事项成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//根据id修改待办事项
var update_todo = async (ctx, next)=>{
    var responseData = {
        message : '修改待办事项失败'
    }
    try{
        let id = ctx.request.body.id;
        let option = ctx.request.body.option;
        let statusId = ctx.request.body.statusId;
        if(id <= 0 || isNaN(id)){
            responseData.message = '待办事项id不合法';
            throw new Error();
        }
        if(!option){
            responseData.message = '待办事项名称未填写';
            throw new Error();
        }
        if(statusId <= 0 || isNaN(statusId)){
            responseData.message = '待办事项状态id不合法';
            throw new Error();
        }
        await todo_dao.update_todo(id, option, statusId);
        responseData.message = '修改待办事项成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//获取待办事项列表
var get_todos = async (ctx, next)=>{
    var responseData = {
        message : '获取待办事项列表失败'
    }
    try{
        let todos = null;
        let offset = ctx.request.body.offset;
        let limit = ctx.request.body.limit;
        if(offset < 0 || isNaN(offset)){
            responseData.message = 'offset不合法';
            throw new Error();
        }
        if(limit < 0 || isNaN(limit)){
            responseData.message = 'limit不合法';
            throw new Error();
        }
        await todo_dao.get_todos(offset, limit).then((result)=>{
            todos = result;
        })
        console.log(JSON.stringify(todos));
        ctx.response.body = todos;
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /addTodo' : add_todo,
    'post /getTodos' : get_todos,
    'post /removeTodo' : remove_todo,
    'post /updateTodo' : update_todo
}