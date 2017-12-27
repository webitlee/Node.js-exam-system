var login = async (ctx, next)=>{
    await next();
    // ctx.response.body = {
    //     message : '11112'
    // }
    throw new Error();
}

module.exports = {
    'get /login' : login
}
