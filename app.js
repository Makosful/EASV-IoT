require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const sock = require('socket.io')(http)
const port = +process.env.PORT || 3000
const mqtt = require('./mqtt-client')
const rest = require('./rest-client')

mqtt.setup(sock);
rest.setup(app);

http.listen(port, () => {
    console.log(`App listening at *:${port}`)
})
