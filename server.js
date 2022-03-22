// Require Express.js
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

function coinFlip() {
    return (Math.random() > 0.5 ? "heads" : "tails");
}

function coinFlips(flips) {
    const flipResults = [];
    const output = { raw: [], summary: "" };
  
    for (var i = 0; i < flips; i++) {
        flipResults.push(coinFlip());
    }
  
    output.raw = flipResults;
    output.summary = countFlips(flipResults);
  
    return output;
}

function countFlips(array) {
    var counts = { heads: 0, tails: 0 };

    array.forEach(element => {
        if (element == "heads")
            counts.heads++;
        else
            counts.tails++;
    });

    if (counts.heads == 0)
        delete counts.heads;
    else if (counts.tails == 0)
        delete counts.tails;

    return counts;
}

function flipACoin(call) {
    var result = coinFlip();
    const output = { call: "", flip: "", result: "" };

    output.call = call;
    output.flip = result;
    output.result = (call == result ? "win" : "lose");

    return output;
}

app.get('/app/', (req,res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/flip', (req,res) => {
    res.send({flip: coinFlip()})
});

app.get('/app/flips/:number', (req,res) => {
    res.send(coinFlips(req.params.number))
});

app.get('/app/flip/call/heads', (req,res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('/app/flip/call/tails', (req,res) => {
    res.status(200).json(flipACoin("tails"))
});

// Default response for any other request
app.use(function(req,res) {
    res.status(404).send('404 NOT FOUND')
});