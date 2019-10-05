const express = require('express');
const http = require('http');
const podId = process.env.POD_IP

const options = {
    hostname: '',
    port: 80,
    method: 'POST',
    headers: {
        'Ce-Id': 'myapp',
        'Ce-Specversion': '0.2',
        'Ce-Type': 'test',
        'Ce-Source': '',
        'Content-Type': 'application/json'
    }
}

var app = express();

app.use(express.static('/mnt/data/build'));  

app.listen(3000, function(){
    console.log("Running app on port 3000");
    let brokerIP = process.env.DEFAULT_BROKER_SERVICE_HOST
    options.hostname = brokerIP
    options.headers["Ce-Source"] = podId
    console.log("Sending app ready to broker")
    const req = http.request(options, res => {
        res.on('data', d => {
            console.log(d.toString('utf-8'))
        })
    })
    req.on('error', error => {
        console.error(error)
    })
    req.write(JSON.stringify({ msg: "Start integration test" }))
    req.end()
});