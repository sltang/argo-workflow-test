const config = require('./config.js');
const http = require('http');
const https = require('https');
const fs = require('fs');

const createTestCafe = require('/usr/lib/node_modules/testcafe');
let testcafe = null;

const namespace = process.env.POD_NAMESPACE
const workFlow = process.env.WORKFLOW_NAME
const token = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token', 'utf8')
const path = `/apis/argoproj.io/v1alpha1/namespaces/${namespace}/workflows/${workFlow}`
//POST options to delete Argo workflow
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

http.createServer(function (req, res) {
  if (req.method === 'POST') {
    if (req.headers['ce-type'] === 'test') {//header names are case-sensitive
      config.pageUrl = "http://" + req.headers['ce-source'] + ":3000/"
      createTestCafe('localhost', 1337, 1338) //run tests
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
          //write test results to persistent volume; it may not work with RWO only persistent volumes when running on multiple nodes
          //fs.writeFileSync("/mnt/data/integration-test-results-" + Date.now(), failedCount)
          testcafe.close();
          const _req = https.request(options, _res => {//call Kubernetes api-server to delete Argo workflow
            _res.on('data', d => {
              console.log(d.toString('utf-8'))
            })
          })
          _req.on('error', error => {
            console.error(error)
          })
          _req.end()
        });
      req.on('end', () => {
        res.end('ok');
      });
    } else {
      console.error(`Missing ce-type header: ${req.headers}`)
      res.statusCode = 400;
      res.end('Missing ce-type header');
    }
  } else {
    res.end('Success!'); //end the response
  }
}).listen(8080); //the server object listens on port 8080

