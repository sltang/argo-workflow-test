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

const yaml = fs.readFileSync("../github-event-receiver/test-workflow.yaml")

const req = http.request(options, res => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', d => {
        console.log(d.toString('utf-8'))
    })
})
req.on('error', error => {
    console.error(error)
})
req.write(yaml)
req.end()