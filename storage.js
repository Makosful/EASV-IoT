const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

const Sensor = mongoose.model('Sensor', {
    location: String,
    sensor: String,
    temperature: Number,
    pressure: Number,
    humidity: Number,
    timestamp: Number
});

function saveSensorData(str) {
    let a = str.replace(' ', ',')
    let b = a.split(',')

    for (let i = 0; i < b.length; i++) {
        let x = b[i].split('=')
        if (x.length > 1)
            b[i] = x[1]
        else
            b[i] = x[0]
    }

    let c = new Sensor({
        location:    b[1].toString(),
        sensor:      b[2].toString(),
        temperature:+b[3],
        pressure:   +b[4],
        humidity:   +b[5],
        timestamp:  +new Date(),
    })

    c.save().then(()=>console.log('success')).catch(err=>console.error(err))
}

async function loadSensorData(str) {
    const query = await Sensor.find({sensor: str})
    return query
}

module.exports = {
    saveSensorData,
    loadSensorData,
}

// environment,
// location=lindelunden48,
// sensor=badevaerelse1
// temperature=25.07,
// pressure=101907.46,
// humidity=49.83