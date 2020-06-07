// const express = require('express')
// const app = express()
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx) => {
    /* centralized error handling:
        *   console.log error
        *   write error to log file
        *   save error and request information to database if ctx.request match condition
        *   ...
    */
});


router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
});

router.post('/webhook', async (ctx, next) => {
    const req = ctx.request;
    const requestEvents = req.body.events;
    const res = ctx.response;
    reply(requestEvents.body.events[0].replyToken);
    ctx.status = status || 200;
});

// router.get('/webhook', (req, res) => {
//     let reply_token = req.body.events[0].replyToken
//     reply(reply_token)
//     res.sendStatus(200)
// })
// router.post('/webhooks', async (ctx, next) => {
//     const req = ctx.request;
//     const requestEvents = req.body.events;
//     const res = ctx.response;
//     reply(requestEvents.body.events[0].replyToken);
//     ctx.status = status || 200;
// })

const server = app.listen(port);
module.exports = server;

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {M4FwidNNBw/+et8auvI4Q4C6iNgAAQYQDFzAyRf5kc4qLzYsckPnTOAutA7rDLsxgF3QApm6caL7EHjynnQGQn+P0kb+T3Qknn7nR3iBCLsV3hSWA9Dwj4NORcQIHLjsod9HB85mcPg3uxCDpsg2dAdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
