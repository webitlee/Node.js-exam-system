//处理考题范围相关接口
const dao = require('../import-middleware')('dao');
const scope_dao = dao.scope;


//添加考题范围
var add_scope = async (ctx, next)=>{
    var responseData = {
        message : '考题范围添加失败'
    }
    try{
        let name = ctx.request.body.name;
        if(!name){
            responseData.message = '考题范围未填写';
            throw new Error();
        }
        scope_dao.add_scope(name);
        console.log(name);
        responseData.message = '考题范围添加成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//获取所有考题范围
var get_scopes = async(ctx, next)=>{
    try{
        let scopes = null;
        await scope_dao.get_scopes().then((result)=>{
            scopes = result;
        })
        console.log(scopes);
        ctx.response.body = scopes;
        await next();
    }catch(err){
        console.error('获取考题范围失败');
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /addScope' : add_scope,
    'get /getScopes' : get_scopes
}