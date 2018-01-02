//初始化数据库
const model = require('./import-middleware')();

function sync(model){
    for(var key in model){
        let table = model[key];
        table.sync();
    }
}

module.exports = {
  sync : () => sync(model)  
}
    
    