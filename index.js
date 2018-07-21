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

const char_limit = 50;

var input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.";
var sp = splitter(input);
console.log(sp);

var input = "I can't believe Tweeter now supports chunking my messages, so I don't have       to do it myself.";
var sp = splitter(input);
console.log(sp);

// SOLUTION 1
var input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe        it it it it it it it it it I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.Tweeter now supports chunking my messages, so I don't have to do it myself.";

var sp = splitter(input);
console.log(sp);

var input = "2/6 my messages, so I don't have       to do it myself.";
// console.log(input.length);

// return;

function splitter(input, count_parts = 0) {
    var split_by_space = input.split(" ");
    var concat_word = "";
    var k = 1;

    var result_array = [];

    for (var x = 0; x < split_by_space.length; x++) {
        
        var prefix = k + "/" + count_parts + " ";
        var word = split_by_space[x];

        var tmp = concat_word;
        concat_word += word + " ";

        var com = prefix.length + concat_word.length - 1;

        if (com >= char_limit) {
            concat_word = tmp.trim();

            var pref_concat = prefix + concat_word;
            result_array.push(pref_concat + " " + pref_concat.length);
            concat_word = word + " ";
            k++;
        }
    }

    if (concat_word != "") {
        var prefix = k + "/" + count_parts + " ";
        var pref_concat = prefix + concat_word.trim();
        result_array.push(pref_concat + " " + pref_concat.length);
    }

    if (count_parts == 0) return splitter(input, result_array.length);

    return result_array;
}

app.listen(port, function(){
    console.log('listening on *:' + port);
});