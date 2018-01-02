//导入中间件
const fs = require('fs');

function addModels(dirname){
    let files = fs.readdirSync(`./${dirname}`);
    
    //过滤出js文件
    let js_files = files.filter((file)=>{
        return file.endsWith('.js');
    })
    
    var models = {};
    for(let f of js_files){
        let name = f.substring(0, f.length - 3);
        models[name] = require(`./${dirname}/${f}`);
    }
    return models;
}
module.exports = (dirname) =>{
    var dir = dirname || 'models';
    return addModels(dir);
}