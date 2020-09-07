const mqtt = require('mqtt')
const db = require('./storage')
let client  = mqtt.connect(
    'mqtt://' + process.env.MQTT_ADDRESS,
    {
        port: +process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    })

function setup() {
    client.on('connect', function () {
        console.log('Connected!! Lars is the King of the planet');
    })

    client.on('message', function (topic, message) {
        if (topic === 'esp32/environment') {
            // message is Buffer
            //console.log(`${topic} ${message.toString()}`)
            db.saveSensorData(message.toString())
        }
    })

    client.subscribe('#');
}

module.exports = {
    setup,
}