'use strict';
/******************************************
*
* 	Require necessary packages
*
******************************************/
var chai = require('chai');
chai.should();
chai.use(require('chai-things'));

// Require splitter function
var splitMessage = require('../splitMessage');

describe('splitMessage()', function() {
	// Test Case #1
	it ('should return as is if input is less than 50 characters', function() {
		var input = "I can't believe Tweeter now supports.";
		var expected_result = "I can't believe Tweeter now supports.";

		var fn_result = splitMessage(input);

		chai.expect(fn_result).to.be.equal(expected_result);
	});

	// Test Case #2
	it ('should split long string into two arrays', function() {
		var input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.";
		var expected_result = ["1/2 I can't believe Tweeter now supports chunking", 
							"2/2 my messages, so I don't have to do it myself."];

		var fn_result = splitMessage(input);

		chai.expect(fn_result).to.be.eql(expected_result);
	});

	// Test Case #3
	it ('should split long string into three arrays', function() {
		var input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself. Adding a test sentence.";
		var expected_result = ["1/3 I can't believe Tweeter now supports chunking", 
							"2/3 my messages, so I don't have to do it myself.",
							"3/3 Adding a test sentence."];

		var fn_result = splitMessage(input);

		chai.expect(fn_result).to.be.eql(expected_result);
	});

	// Test Case #4
	it ('should no of characters in each array values be less than or equal 50', function() {
		var input = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet lectus nec lectus rutrum, in vehicula ligula ullamcorper. Morbi ultricies massa sed lectus tristique lacinia. Suspendisse accumsan magna eros, posuere suscipit augue volutpat quis. Donec accumsan, diam ut eleifend cursus, est felis hendrerit enim, egestas ultricies mauris odio a sapien. In sit amet ultricies dolor. Donec sit amet nisl feugiat, rutrum odio at, convallis orci. Curabitur feugiat ante sit amet urna maximus, vel malesuada ligula rhoncus. In a est vel massa maximus vestibulum eget eu ligula. Aliquam mattis porttitor viverra.";
		var max_chars = 50;

		var fn_result = splitMessage(input);

		var count = [];
		fn_result.forEach(function(element) {
			count.push(element.length);
		});

		count.should.all.be.below(max_chars+1);
	});

	// Test Case #5
	it ('should not contain a span of non-whitespace characters longer than 50 characters', function() {
		var input = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz abcd";

		var fn_result = function () { splitMessage(input); };

		chai.expect(fn_result).to.throw(TypeError, 'Illegal word');
	});
});