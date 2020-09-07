const db = require('./storage')

function setup(app) {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/sensor/:sensorId', (req, res) => {
        let sensorId = req.params.sensorId
        db.loadSensorData(sensorId)
            .then(x=>res.json(x))
            .catch(err=>console.error(err))
    })
}

module.exports = {
    setup,
}