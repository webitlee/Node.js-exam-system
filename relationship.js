//管理表之间的关系
const model = require('./import-middleware')();
var user = model.user;
var exam = model.exam;
var answer = model.answer;
var mistake = model.mistake;
var type = model.type;

function relationship(){
    // user.hasMany(mistake, {
    //     foreignKey : 'user_id'
    // });
    // mistake.hasOne(exam);
    // exam.hasMany(answer);
}

module.exports = relationship();