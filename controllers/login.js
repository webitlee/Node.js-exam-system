//处理考生登录路由接口
const service = require('../import-middleware')('service');
const login_service = service.login;
var login = async (ctx, next)=>{
    var responseData = {
        message : '考生信息提交失败'
    };
    try{
        var name = ctx.request.body.name;
        var gender = ctx.request.body.gender;
        var type = ctx.request.body.type;
        console.log(ctx.request.body);
        if(!name){
            responseData.message = '考生姓名未填写';
            throw new Error();
        }
        if(gender !== true && gender !== false){
            responseData.message = '性别填写错误';
            throw new Error();
        }
        if(type === 0){
            responseData.message = '考题类型未选择';
            throw new Error();
        }
        if(isNaN(type)){
            responseData.message = '考题类型不存在';
            throw new Error();
        }
        login_service(name, type, gender);
        responseData.message = '考生信息提交成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /login' : login
}
