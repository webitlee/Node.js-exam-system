//初始化数据库
const model = require('./model');

model.sync();
process.exit(0);