//处理考题相关的数据库操作
const model = require('../import-middleware')();
const exam = model.exam;
const answer = model.answer;

//添加考题
function add_exam(title, content, options, type, scope){
    var answers = [];
    for(let i = 0; i < options.length; i++){
        let obj = {
            option : options[i]
        }
        answers.push(obj);
    }
    console.log(answers);
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

module.exports = {
    add_exam
}