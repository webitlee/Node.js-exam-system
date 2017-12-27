//用户表

const db = requeire('./db');
var user = db.defineModel('user', {
    name : db.sequelizeObj.STRING(100),
    type : {
        type : db.sequelizeObj.INTEGER,
        unique : true
    },
    gender : db.sequelizeObj.BOOLEAN
})