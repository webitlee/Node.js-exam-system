const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const cors = require('koa-cors');
const app = new Koa();
//导入跨域配置中间件
const cors = require('./cors');
//导入controller的中间件
const controller = require('./controller');
//导入自动建表中间件
const init_db = require('./init-db');

//自动建表
init_db.sync();


//注册跨域请求
app.use(cors());
//注册post请求体解析
app.use(bodyParser());
//注册所有路由
app.use(controller());
//监听8888端口
app.listen(8888);