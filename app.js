const express = require('express')
const app = express()
const port = process.env.PORT || 4000
var distDir = __dirname+ "/dist/"
app.use(express.static(distDir))
app.post('/webhook', (req, res) => res.sendStatus(200))
app.listen(port)