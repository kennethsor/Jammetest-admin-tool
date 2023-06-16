const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');

const testDefinitions = require('./testdefinitions/test_definitions.json');
const testSites = require('./src/TestSitesStatusObj.json');

const app = express();
const PORT = process.env.PORT || 5172;

var currentTest = testDefinitions.tests[0];

const key = fs.readFileSync('localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('localhost.pem', 'utf-8');

app.use(bodyParser.json());
app.use(cors()); 
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>  {
    res.send("<h2>It's Working!</h2>")
});

app.get('/api/testsites', (req, res) => {
    console.log(new Date().toISOString() + " - received requst for available sites!");
});

app.get('/api/servertime', (req, res) => {
    console.log(new Date().toISOString() + " - received requst for local time at server!");
    res.send({date: new Date().toISOString()});
});

app.get('/api/testDefinitions', (req, res) => {
    console.log(new Date().toISOString() + " - received request for all test definitions!");
    res.send(testDefinitions.tests);
});

app.get('/api/currentTest', (req, res) => {
    console.log(new Date().toISOString() + " - received request for chosen test!");
    res.send(currentTest);    
});

app.post('/api/currentTest', (req, res) => {
    console.log(new Date().toISOString() + " - received post for chosen test!");
    currentTest = req.body.selectedItem;
});

app.get('updateConfig', (req,res) => {
    res.send("Whatever...");
})

https.createServer({key, cert}, app).listen(PORT, () => {
    console.log('REST is listening on port: ' + PORT);
});