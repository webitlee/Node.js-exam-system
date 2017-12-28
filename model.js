//导入Model
const fs = require('fs');
const db = require('./db');
const Sequelize = require('sequelize');

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
    models.sync = () => {
        Sequelize.sync();
    }
    return models;
}
module.exports = (dirname) =>{
    var dir = dirname || 'models';
    return addModels(dir);
}