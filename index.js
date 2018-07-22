/******************************************
*
* 	Require necessary packages
*
******************************************/
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

// Set port to be used
var port = process.env.PORT || 5000;

// Require splitter function
var splitMessage = require('./splitMessage');

/******************************************
*
* 	Endpont: /
*	Method: GET
*
******************************************/
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

/******************************************
*
* 	Endpont: /splitMessage
*	Method: POST
*	Params: 
*		input: String
*
******************************************/
app.post('/splitMessage', function(req, res){
	var input = req.body.input;

	try {
	    var result = splitMessage(input);
		res.status(200).json({data : result});
	} catch (error) {
	    if (error instanceof TypeError) {
	        res.status(400).send({'error' : 'Invalid word'});
	    } else {
	    	res.status(500).send({'error' : 'Something went wrong.'});
	    }
	}
});

/******************************************
*
* 			Start Express Server
*
******************************************/
app.listen(port, function(){
    console.log('listening on *:' + port);
});