// const express = require('express')
// const app = express()
// const Koa = require('koa');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
// const routes = require('./routes');
// const logger = require('koa-logger');
// const port = process.env.PORT || 3000;

// const app = new Koa();
// app.use(bodyParser());
// app.use(logger());

// const router = new Router();
// app.use(router.routes());

// router.post('/webhook', (ctx) => {
//     const requestBody = ctx.request.body;
//     console.log(requestBody);
// });

// router.get('/', (ctx, next) => {
//     ctx.body = 'Hello World!';
// });


// const server = app.listen(port);
// module.exports = server;

// function reply(reply_token) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {M4FwidNNBw/+et8auvI4Q4C6iNgAAQYQDFzAyRf5kc4qLzYsckPnTOAutA7rDLsxgF3QApm6caL7EHjynnQGQn+P0kb+T3Qknn7nR3iBCLsV3hSWA9Dwj4NORcQIHLjsod9HB85mcPg3uxCDpsg2dAdB04t89/1O/w1cDnyilFU=}'
//     }
//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [{
//             type: 'text',
//             text: 'Hello'
//         },
//         {
//             type: 'text',
//             text: 'How are you?'
//         }]
//     })
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
// }

// app.use(router.allowedMethods());

// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         ctx.status = err.status || 500;
//         ctx.body = err.message;
//         ctx.app.emit('error', err, ctx);
//     }
// });

// app.on('error', (err, ctx) => {
//     /* centralized error handling:
//         *   console.log error
//         *   write error to log file
//         *   save error and request information to database if ctx.request match condition
//         *   ...
//     */
// });

// app.use(router.post('/webhooks/status', routes.status));
// app.use(router.post('/webhooks/inbound', routes.inbound));

// app.listen(port, () => console.log('App is wating on port ${port}'));



// router.get('/webhook', async (ctx, next) => {
//     const req = ctx.request;
//     const requestEvents = req.body.events;
//     const res = ctx.response;
//     reply(requestEvents.body.events[0].replyToken);
//     ctx.status = status || 200;
// });

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

