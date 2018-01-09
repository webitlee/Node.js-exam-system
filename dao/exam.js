//处理考题相关的数据库操作
const model = require('../import-middleware')();
const sequelize = require('../constructor-sequelize');
const exam = model.exam;
const answer = model.answer;
const scope = model.scope;

//添加考题
function add_exam(title, content, options, type, scope){
    var answers = [];
    for(let i = 0; i < options.length; i++){
        let option = options[i].replace(/(^\s*)|(\s*$)/g, '');
        let obj = {};
        if(option.slice(-1) === '#'){
            obj.option = option.slice(0, -1);
            obj.is_right = true;
        }else{
            obj.option = option;
            obj.is_right = false;
        }
        answers.push(obj);
    }
    exam.create({
        title,
        content,
        type,
        scope_id : scope,
        answers
    }, {
        include : [answer]
    })
}

//根据id删除考题
function remove_exam(id){
    exam.findById(id, {
        include : [
            {
                model : answer
            }
        ]
    }).then((result)=>{
        //console.log(JSON.stringify(result));
        result.destroy();
        for(let i = 0; i < result.answers.length; i++){
            result.answers[i].destroy();
        }
    })
}
//获取所有考题
async function get_exams(offset, limit){
    var exams = [];
    await exam.findAndCountAll({
        limit,
        offset,
        include : {
            model : scope
        }
    }).then((result)=>{
        exams = JSON.stringify(result);
    })
    return exams;
}
//根据id获取指定考题
async function get_exam(id){
    var data = null;
    await exam.findById(id, {
        include : [
            {
                model : scope
            },
            {
                model : answer
            }
        ]
    }).then((result)=>{
        data = JSON.stringify(result);
    })
    return data;
}
//随机获取指定‘考题范围’，指定数量的考题
async function get_exams_random(scopeId){
    var data = null;
    var limit = 5;
    await sequelize.query('select * from exam where id >= (select floor(rand() * (select max(id) from exam))) and scope_id = ? limit ?', {
        model : exam,
        replacements : [scopeId, limit],
        type : sequelize.QueryTypes.SELECT
    }).then((result)=>{
        data = result;
    })
    return data;
}

//修改指定考题
async function update_exam(id, title, content, options, type, chooseScope){
    await exam.findById(id, {
        include : [
            {
                model : scope
            },
            {
                model : answer
            }
        ]
    }).then((result)=>{
        console.log(JSON.stringify(result));
        result.title = title;
        result.content = content;
        answers = [];
        result.setAnswers([]);
        for(let i = 0; i < options.length; i++){
            var newAnswer = answer.create({option : options[i], exam_id : id});
            result.addAnswers(answers);
        }
        result.type = type;
        result.scope_id = chooseScope;
        result.save();
        //删除旧的answer
        for(let i =0; i < result.answers.length; i++){
            result.answers[i].destroy();
        }
    })
}

module.exports = {
    add_exam,
    get_exams,
    get_exam,
    update_exam,
    remove_exam,
    get_exams_random
}