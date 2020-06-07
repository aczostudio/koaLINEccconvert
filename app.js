const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json)
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {pEGOq+Tl/M7XH0Ipjp0tmKtrYOReUTtAInutIeXtpWz0v/oVLefw8y6twpbJJ3eTgF3QApm6caL7EHjynnQGQn+P0kb+T3Qknn7nR3iBCLvs1h+o8VtsXtPC1xdQRTrJv4fFmnVyAAc+hZFTZ0oGOwdB04t89/1O/w1cDnyilFU=}'
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