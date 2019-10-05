const express = require('express');
const https = require('https')
const bodyParser = require('body-parser')
const fs = require('fs')

const namespace = process.env.POD_NAMESPACE
const workFlow = process.env.WORKFLOW_NAME
const token = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token', 'utf8')
const path = `/apis/argoproj.io/v1alpha1/namespaces/${namespace}/workflows/${workFlow}`
//POST options to start Argo workflow
const options = {
  hostname: 'kubernetes.default.svc',
  port: 443,
  method: 'POST',
  path: path,
  rejectUnauthorized: false,
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/yaml'
  }
}

var app = express();
var server = require('http').createServer(app);

app.use(bodyParser.json({
    limit: 1024*1024*1024,
    type: 'application/json'
}));

app.post('/', function (req, res) {
    console.log(req.headers)
    console.log(req.body)
    const yaml = fs.readFileSync("./test-workflow.yaml")
    //start Argo workflow
    const _req = https.request(options, _res => {
        console.log(`STATUS: ${res.statusCode}`);
        _res.on('data', d => {
            console.log(d.toString('utf-8'))
            res.end()
        })
    })
    _req.on('error', error => {
        console.error(error)
    })
    _req.write(yaml)
    _req.end()
})

app.get('/health', function (req, res) {
    res.end()
})

server.listen(4567);