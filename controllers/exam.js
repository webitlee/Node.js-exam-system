//处理考题相关的数据接口
const dao = require('../import-middleware')('dao');
const exam_dao = dao.exam;

//添加考题
var add_exam = async (ctx, next)=>{
    responseData = {
        message : '考题添加失败'
    }
    try{
        let title = ctx.request.body.title;
        let content = ctx.request.body.content;
        let options = ctx.request.body.options;
        let type = ctx.request.body.type;
        let scope = ctx.request.body.scope;
        if(!title){
            responseData.message = '考题标题未填写';
            throw new Error();
        }
        if(!content){
            responseData.message= '考题内容未填写';
            throw new Error();
        }
        if(!options){
            responseData.message = '考题选项未填写';
            throw new Error();
        }
        if(type <= 0 || isNaN(type)){
            responseData.message = '考题类型不合法';
            throw new Error();
        }
        if(scope <= 0 || isNaN(scope)){
            responseData.message = '考题范围不合法';
            throw new Error();
        }
        exam_dao.add_exam(title, content, options, type, scope);
        responseData.message = '考题添加成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /addExam' : add_exam
}