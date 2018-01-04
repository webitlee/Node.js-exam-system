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
        await exam_dao.add_exam(title, content, options, type, scope);
        responseData.message = '考题添加成功';
        ctx.response.body = responseData;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//获取所有考题
var get_exams = async(ctx, next)=>{
    var responseData = {
        message : '获取考题列表失败'
    }
    try{
        let exams = null; 
        let offset = ctx.request.body.offset;
        let limit = ctx.request.body.limit;
        if(offset < 0 || isNaN(offset)){
            responseData.message = '页码数不合法';
            throw new Error();
        }
        if(limit <=0 || isNaN(limit)){
            responseData.message = '每页数据条数不合法';
            throw new Error();
        }
        await exam_dao.get_exams(offset, limit).then((result)=>{
            exams = JSON.parse(result);
        })
        console.log(exams);
        ctx.response.body = exams;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}
//根据id获取指定考题
var get_exam = async(ctx, next)=>{
    var responseData = {
        message : '获取指定考题失败'
    }
    try{
        let exam = null;
        let id = ctx.request.body.id;
        if(id <= 0 || isNaN(id)){
            responseData.message = '考题id不合法';
            throw new Error();
        }
        await exam_dao.get_exam(id).then((result)=>{
            exam = JSON.parse(result);
        })
        console.log(exam);
        ctx.response.body = exam;
        await next();
    }catch(err){
        console.error(responseData.message);
        ctx.response.status = 500;
    }
}

//修改指定考题
var update_exam = async (ctx, next)=>{
    var responseData = {
        message : '修改指定考题失败'
    };
    try{
        let id = ctx.request.body.id;
        let title = ctx.request.body.title;
        let content = ctx.request.body.content;
        let options = ctx.request.body.options;
        let type = ctx.request.body.type;
        let scope = ctx.request.body.scope;
        if(id <= 0 || isNaN(id)){
            responseData.message = '考题id不合法';
            throw new Error();
        }
        if(!content){
            responseData.message = '考题内容未填写';
            throw new Error();
        }
        if(options.length <= 1){
            responseData.message = '考题选项数量最少2个';
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
        await exam_dao.update_exam(id, title, content, options, type, scope);
        responseData.message = '考题修改成功';
        ctx.response.body = responseData;
        console.log(1112);
        await next();
    }catch(err){
        console.error(responseDate.message);
        ctx.response.status = 500;
    }
}

module.exports = {
    'post /addExam' : add_exam,
    'post /getExams' : get_exams,
    'post /getExam' : get_exam,
    'post /updateExam' : update_exam
}