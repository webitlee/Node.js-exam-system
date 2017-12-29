//处理跨域问题
const cors = require('koa-cors');
function setCors(){
    return cors({
        origin : 'http://localhost:8080',
        maxAge : 5, //请求结果缓存多久，单位(秒)
        allowMethods : ['GET', 'POST'],
    })
}

module.exports = setCors;