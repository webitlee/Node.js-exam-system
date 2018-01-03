//处理考生登录路由接口
const dao = require('../import-middleware')('dao');
const login_dao = dao.login;
var login = async (ctx, next)=>{
    var responseData = {
        message : '考生信息提交失败'
    };
    try{
        var name = ctx.request.body.name;
        var gender = ctx.request.body.gender;
        var scope = ctx.request.body.scope;
        if(!name){
            responseData.message = '考生姓名未填写';
            throw new Error();
        }
        if(gender !== true && gender !== false){
            responseData.message = '性别填写错误';
            throw new Error();
        }
        if(scope === 0){
            responseData.message = '考题类型未选择';
            throw new Error();
        }
        if(isNaN(scope)){
            responseData.message = '考题类型不存在';
            throw new Error();
        }
        login_dao.add_user(name, scope, gender);
        responseData.message = '考生信息提交成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//获取考题类型
var get_scopes = async (ctx, next)=>{
    try{
        let scopes = null;
        await login_dao.get_scopes().then((result)=>{
            scopes = result;
        });
        ctx.response.body = scopes;
        await next();
    }catch(err){
        console.error('考题类型获取失败');
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /login' : login,
    'get /getScopes' : get_scopes
}
