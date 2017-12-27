//导入Model
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(`./${models}`);

//过滤出js文件
let js_files = files.filter((file)=>{
    return file.endsWith('.js');
})

var models = {};
for(let f of js_files){
    let name = f.substring(0, f.length - 3);
    models[name] = require(`./models/${f}`);
}
models.sync = () => {
    db.sync();
}
module.exports = models;