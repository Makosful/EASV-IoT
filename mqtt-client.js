const mqtt = require('mqtt')
const db = require('./storage')
let client  = mqtt.connect(
    'mqtt://' + process.env.MQTT_ADDRESS,
    {
        port: +process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    })

function setup(sock) {
    client.on('connect', function () {
        console.log('Connected!! Lars is the King of the planet');
    })

    client.on('message', function (topic, message) {
        let msg = message.toString();
        console.debug(`${topic} :: ${msg}`)

        sock.emit('mqtt', {topic: topic, message: msg})

        if (topic === 'esp32/environment') {
            // message is Buffer
            db.saveSensorData(msg)
        } else {
            // Do nothing
        }
    })

    client.subscribe('#');

    sock.on('connection', (socket) => {
        console.log('Socket connected')
    })
}

module.exports = {
    setup,
}