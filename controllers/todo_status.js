//处理事项状态相关接口
const dao = require('../import-middleware')('dao');
const todo_status_dao = dao.todo_status;

//添加事项状态
var add_status = async (ctx, next)=>{
    var responseData = {
        message : '添加事项状态失败'
    }
    try{
        let name = ctx.request.body.name;
        if(!name){
            responseData.message = '状态名称不合法'
            throw new Error();
        }
        console.log(name);
        await todo_status_dao.add_status(name);
        responseData.message = '添加状态成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//根据id删除事项状态
var remove_status = async (ctx, next)=>{
    var responseData = {
        message : '删除事项状态失败'
    }
    try{
        let id = ctx.request.body.id;
        if(id <= 0 || isNaN(id)){
            responseData.message = 'id不合法';
            throw new Error();
        }
        await todo_status_dao.remove_status(id);
        responseData.message = '删除事项状态成功';
        ctx.response.body = responseData;
    }catch(error){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//根据id修改事项状态名称
var update_status = async (ctx, next)=>{
    var responseData = {
        message : '修改状态失败'
    }
    try{
        let id = ctx.request.body.id;
        let name = ctx.request.body.name;
        if(id <= 0 || isNaN(id)){
            responseData.message = 'id不合法';
            throw new Error();
        }
        if(!name){
            responseData.message = '状态名称未填写';
            throw new Error();
        }
        await todo_status_dao.update_status(id, name);
        responseData.message = '修改状态名称成功';
        ctx.response.body = responseData;
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//获取所有事项状态
var get_all_status = async (ctx, next)=>{
    var responseData = {
        message : '获取状态列表失败'
    }
    try{
        let limit = ctx.request.body.limit;
        let offset = ctx.request.body.offset;
        if(limit <=0 || isNaN(limit)){
            responseData.message = 'limit不合法';
            throw new Error();
        }
        if(offset < 0 || isNaN(offset)){
            responseData.message = 'offset不合法';
            throw new Error();
        }
        let status = null;
        await todo_status_dao.get_all_status(offset, limit).then((result)=>{
            status = result;
        })
        ctx.response.body = status;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /addStatus' : add_status,
    'post /getAllStatus' : get_all_status,
    'post /updateStatus' : update_status,
    'post /removeStatus' : remove_status
}