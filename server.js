const Koa = require('koa');

const server = new Koa();
server.use(ctx => {
    ctx.body = 'I am your fist KOA API!'
})
.listen(3001);