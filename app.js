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
    .get('/', async (ctx, next) => { 
        ctx.body = 'Hello World!';
    })
    .post('/webhook', async (ctx, next) => {
        console.log("call webhook");
        console.log(ctx);
        try {
            console.log('token = ' , ctx.request.body.events[0].replyToken);
            if(ctx.request.body.events[0].replyToken ===  '00000000000000000000000000000000') {
                ctx.status = 200;
            } else {
                var line_post = await router.post({
                    url: 'https://api.line.me/v2/bot/message/reply',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer {ShkuSBy9o1OAXcyOyYYBctPrd3aY3ZuUdDlTfdvjomurWcnE38CjKechkXF++7G9wh8C6/1Ise1iEVQzcwHpr1nwsajzUieMqrZZmgtga8ZNmbKfech4BV0zui3kkzYpqUu752d4Uzol+gPpXvJcpwdB04t89/1O/w1cDnyilFU=}'
                    },
                    body: {
                        replyToken: ctx.request.body.events[0].replyToken,
                        messages: [{
                            type: 'text',
                            text: 'Hello'
                        },
                        {
                            type: 'text',
                            text: 'How are you?'
                        }]
                    },
                    json: true
                })

                console.log('posting = ' , line_post)
            }
        } catch (err) {
            console.log('server error', err, ctx);
        }
    });

const server = app.listen(port);
module.exports = server;