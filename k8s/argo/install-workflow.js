const http = require('http');
const fs = require('fs');

const options = {
    hostname: "localhost",
    port: 8080,
    method: "POST",
    path: '/apis/argoproj.io/v1alpha1/namespaces/argo-test/workflows',
    headers: {
        "content-type": "application/yaml",
    }
}

console.log(options)

const yaml = fs.readFileSync("test-workflow-daemon-event.yaml")

const _req = http.request(options, _res => {
    console.log(`STATUS: ${_res.statusCode}`);
    _res.on('data', d => {
        console.log(d.toString('utf-8'))
    })
})
_req.on('error', error => {
    console.error(error)
})
_req.write(yaml)
_req.end()