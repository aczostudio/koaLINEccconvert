const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const body = require('koa-body');
const port = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

app
    .use(body({
        formidable: {uploadDir: './uploads'},
        multipart: true,
        urlencoded: true
    }))
    .use(Logger())
    .use(async (ctx, next) => {
        try {
        await next();
        } catch (err) {
            ctx.body = err.message;
            ctx.status = err.status || 500;
            ctx.app.emit('error', err, ctx);
        }
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error', (err, ctx) => {
        console.log('server error', err, ctx)
    });

router
    .get('/', (ctx, next) => { 
        ctx.body = 'Hello World!';
    })
    .post('/webhook', async (ctx, next) => {
        let reply_Token = ctx.request.body.events[0].replyToken;
        if(reply_Token ===  '00000000000000000000000000000000') {
            ctx.status = 200;
        } else {
            await router.post({
                method: 'POST',
                url: 'https://api.line.me/v2/bot/message/reply',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer {ShkuSBy9o1OAXcyOyYYBctPrd3aY3ZuUdDlTfdvjomurWcnE38CjKechkXF++7G9wh8C6/1Ise1iEVQzcwHpr1nwsajzUieMqrZZmgtga8ZNmbKfech4BV0zui3kkzYpqUu752d4Uzol+gPpXvJcpwdB04t89/1O/w1cDnyilFU=}'
                },
                body: ({
                    replyToken: reply_token,
                    messages: [{
                        type: 'text',
                        text: 'Hello'
                    },
                    {
                        type: 'text',
                        text: 'How are you?'
                    }]
                }),
                json: true
            })
        }
    });

const server = app.listen(port);
module.exports = server;