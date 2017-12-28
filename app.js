const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const app = new Koa();
//导入controller的中间件
const controller = require('./controller');
//导入model中间件
const model = require('./model')();
app.use(async (ctx, next)=>{
    try{
        await next();
    }catch(err){
        ctx.response.body = {
            error : true,
            message : err.message
        };
        console.log(err);
    }
})
model.sync();
app.use(cors({
    origin : 'http://localhost:8080',
    maxAge : 5, //请求结果缓存多久，单位(秒)
    allowMethods : ['GET', 'POST'],
}));
app.use(bodyParser());
app.use(controller());
app.listen(8888);