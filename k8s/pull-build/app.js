const express = require('express');
const http = require('http');
const podId = process.argv[2]

const options = {
    hostname: '',
    port: 80,
    method: 'POST',
    headers: {
        'Ce-Id': 'github event',
        'Ce-Specversion': '0.2',
        'Ce-Type': 'test',
        'Ce-Source': '',
        'Content-Type': 'application/json'
    }
}

var app = express();
//var server = require('http').createServer(app);

app.use(express.static('/app/build'));  

//server.listen(3000);

app.listen(3000, function(){
    console.log("Running app on port 3000 1");
    console.log(podId)
    //dns.js cannot resolve if hostname is used directly
    let brokerIP = process.env.DEFAULT_BROKER_SERVICE_HOST
    console.log(brokerIP)
    options.hostname = brokerIP
    options.headers["Ce-Source"] = podId
    setTimeout(() => {
        console.log("sending ready to broker")
        const req = http.request(options, res => {
            console.log(`STATUS: ${res.statusCode}`);
            res.on('data', d => {
                console.log(d.toString('utf-8'))
            })
        })
        req.on('error', error => {
            console.error(error)
        })
        req.write(JSON.stringify({ msg: "Start integration test" }))
        req.end()
    }, 10000)
});