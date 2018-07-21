var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var path = require("path");
var port = process.env.PORT || 5000;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

// Require function splitMessage
var splitMessage = require('./splitMessage');

var input = "I can't believe Tasdadaskdjasjdkajkdjaskdjkjaksdjkasjdkjakdjkjaskdkasjdkjaskdjkajdkjaksjweeter now supports chunking my messages, so I don't have to do it myself.";

try {
    var fn_result = splitMessage(input);
    console.log(fn_result);
} catch (error) {
    if (error instanceof TypeError) {
        console.log("Error: " + error);
    }
}

app.listen(port, function(){
    console.log('listening on *:' + port);
});