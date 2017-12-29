//处理考生登录路由接口
const login_dao = require('../dao/login');
var login = async (ctx, next)=>{
    try{
        var name = ctx.request.body.name;
        var gender = ctx.request.body.gender;
        var type = ctx.request.body.type;
        if(!name){
            throw new Error('考生姓名未填写');
        }
        if(gender !== true && gender !== false){
            throw new Error('性别填写错误');
        }
        if(type === 0){
            throw new Error('考题类型未选择');
        }
        if(isNaN(type)){
            throw new Error('考题类型不存在');
        }
        console.log(ctx.request.body);
        login_dao(name, type, gender);
        ctx.response.body = {
            message : '考生信息提交成功'
        }
        await next();
    }catch(err){
        ctx.response.status = 500;
        ctx.response.body = {
            error : true,
            message : '考生信息提交失败'
        }
    }
}

module.exports = {
    'post /login' : login
}
