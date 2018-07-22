const char_limit = 50;

function splitMessage(input, count_parts = 0) {
    /*** If input length is less than or greater than 50, return it as is ***/ 
    if (input.length <= char_limit) return input;

    var words = input.split(" ");
    var concat_word = "";
    var k = 1;

    var result_array = [];

    for (var x = 0; x < words.length; x++) {
        var word = words[x];

        /*** If word is more than 50 characters, throw error ***/ 
        if (word.length > char_limit) throw new TypeError('Illegal word!');

        var tmp = concat_word;
        concat_word += word + " ";

        var prefix = k + "/" + count_parts + " ";
        var com = prefix.length + concat_word.length - 1;

        if (com >= char_limit) {
            concat_word = tmp.trim();

            var pref_concat = prefix + concat_word;
            result_array.push(pref_concat);
            concat_word = word + " ";
            k++;
        }
    }

    if (concat_word != "") {
        var prefix = k + "/" + count_parts + " ";
        var pref_concat = prefix + concat_word.trim();
        result_array.push(pref_concat);
        k++;
    }

    if (count_parts != result_array.length) return splitMessage(input, result_array.length);

    return result_array;
}

module.exports = splitMessage;