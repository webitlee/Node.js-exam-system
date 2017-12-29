//扫描注册Controller
const fs = require('fs');

function addController(router, dir){
    //使用readdirSync列出文件
    const files = fs.readdirSync(`./${dir}`);
    //过滤出.js文件
    var js_files = files.filter((file)=>{
        return file.endsWith('.js');
    })
    for(var f in js_files){
        let mapping = require(`./${dir}/${js_files[f]}`);
        addMapping(router, mapping);
    }
}


function addMapping(router, mapping){
    //处理每个js文件
    for(let url in mapping){
        if(url.startsWith('get ')){
            //url类似'get /xxx'
            let path = url.substring(4);
            router.get(path, mapping[url]);
        }else if(url.startsWith('post ')){
            //url类似'post /xxx'
            let path = url.substring(5);
            router.post(path, mapping[url]);
        }else{
            console.error("无效的URL：" + url);
        }
    }
}

module.exports = function(dir){
    let controllers_dir = dir || 'controllers';
    const router = require('koa-router')();
    addController(router, controllers_dir);
    return router.routes();
}
