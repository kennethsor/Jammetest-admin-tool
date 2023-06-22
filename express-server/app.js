const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const { auth } = require('express-openid-connect');

const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
}

const TestHandler = require('./src/TestStateHandler').TestStateHandler;
const testDefinitions = require('./testdefinitions/TestSitesStatusObj.json');

const app = express();
const PORT = process.env.PORT || 5172;

//var currentTest = testDefinitions.tests[0];
const currentTest = 1;
const testHandler = TestHandler.getInstance(testDefinitions);

const key = fs.readFileSync('localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('localhost.pem', 'utf-8');

app.use(bodyParser.json());
app.use(cors()); 
app.use(express.urlencoded({extended: true}));
app.use(auth(authConfig));


app.get('/', (req, res) =>  {
    res.send("<h2>It's Working!</h2>")
});

app.get('/api/testsites', (req, res) => {
    console.log(new Date().toISOString() + " - received requst for available sites!");
    const sites = testHandler.getAllSites();
    return res.send(sites);
});

app.get('/api/servertime', (req, res) => {
    console.log(new Date().toISOString() + " - received requst for local time at server!");
    res.send({date: new Date().toISOString()});
});

app.get('/api/testdefinitions/:testsite', (req, res) => {
    const testsite = req.params.testsite.replace(':','');
    console.log(new Date().toISOString() + " - received request for all test on site: " + testsite);
    const site = testHandler.getSiteByName(testsite);
    res.send(site.tests);
});

app.get('/api/testdefinitions/:testsite/:testid', (req,res) => {
    const testsite = req.params.testsite.replace(':','');
    const testid = parseInt(req.params.testid.replace(':',''));
    console.log(new Date().toISOString() + " - received request for test: " + testid +  " test on site: " + testsite);
    const site = testHandler.getSiteByName(testsite);
    res.send(testHandler.getTest(site.id, testid));
});

app.get('/api/testrunning/:sitename/:testid', (req, res) => {
    console.log(new Date().toISOString() + " - received request test running...");
    const testid = parseInt(req.params.testid.replace(':',''));
    const site = testHandler.getSiteByName(req.params.sitename.replace(':',''));
    res.send(testHandler.isTestRunning(site.id, testid)); 
});

app.post('/api/starttest/', (req, res) => {
    const body = req.body;
    console.log(new Date().toISOString() + " - received post to start running test " + body.test + ' on site ' + body.site);
    res.sendStatus(!testHandler.startRunningTest(body.site, body.test) ? 200 : 406);
});

app.post('/api/stoptest/', (req, res) => {
    const body = req.body;
    console.log(new Date().toISOString() + " - received post to stop running test " + body.test + ' on site ' + body.site);
    res.sendStatus(!testHandler.stopRunningTest(body.site, body.test) ? 200 : 406);
});

// app.get('/api/testDefinitions', (req, res) => {
//     console.log(new Date().toISOString() + " - received request for all test definitions!");
//     res.send(testDefinitions.tests);
// });

// app.get('/api/currentTest', (req, res) => {
//     console.log(new Date().toISOString() + " - received request for chosen test!");
//     res.send(currentTest);    
// });

// app.get('updateConfig', (req,res) => {
//     res.send("Whatever...");
// })


https.createServer({key, cert}, app).listen(PORT, () => {
    console.log('REST is listening on port: ' + PORT);
});