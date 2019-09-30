const config = require('./config.js');
const http = require('http');
const https = require('https');
const fs = require('fs');

const createTestCafe = require('/usr/lib/node_modules/testcafe');
let testcafe = null;
const namespace = process.env.POD_NAMESPACE
//console.log(namespace)
//const hostname = `${process.env.KUBERNETES_SERVICE_HOST}:${process.env.KUBERNETES_SERVICE_PORT}/apis/apps/v1/namespaces/${namespace}/deployments/integration-test`
const workFlow = process.env.WORKFLOW_NAME
const token = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token', 'utf8')
const path = `/apis/argoproj.io/v1alpha1/namespaces/${namespace}/workflows/${workFlow}`
const options = {
  hostname: 'kubernetes.default.svc',
  port: 443,
  method: 'DELETE',
  path: path,
  rejectUnauthorized: false,
  headers: {
    Authorization: `Bearer ${token}`
  }
}
console.log(options)

http.createServer(function (req, res) {
  console.log(req.headers)
  if (req.method === 'POST' && req.headers['ce-type'] === 'test') {//header names are case-sensitive
    config.pageUrl = "http://" + req.headers['ce-source'] + ":3000/"
    createTestCafe('localhost', 1337, 1338)
      .then(tc => {
        console.log("Running tests...")
        testcafe = tc;
        const runner = testcafe.createRunner();
        return runner
          .src('/e2e/tests/*.js')
          .browsers('chromium:headless --no-sandbox')
          .run();
      })
      .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close(); 
        const _req = https.request(options, _res => {//call api-server to delete workflow
          console.log(`STATUS: ${_res.statusCode}`);
          _res.on('data', d => {
            console.log(d.toString('utf-8'))
          })
        })
        _req.on('error', error => {
          console.error(error)
        })
        //_req.write(JSON.stringify({ apiVersion: "v1", kind: "DeleteOptions", gracePeriodSeconds: 0 }))
        _req.end()       
      });
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      console.log(body);
      res.end('ok');
    });
  } else {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  }
}).listen(8080, function() {//the server object listens on port 8080
  //post ready message to broker
}); 

