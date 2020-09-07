require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001 // prod = port 80
const mqtt = require('./mqtt-client')
const rest = require('./rest-client')
//const db = require('./storage')

mqtt.setup();
rest.setup(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
