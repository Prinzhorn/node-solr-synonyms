var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;

var synonyms = require('../');

var input = fs.readFileSync(path.join(__dirname, '/synonyms.txt'), 'UTF-8');

it('works with expand set to false', function() {
	var withoutExpand = synonyms.parse(input, true, false);

	expect(withoutExpand).to.deep.equal({
		'i-pod': ['ipod', 'i-pod', 'i pod'],
		'i pod': ['ipod', 'i-pod', 'i pod'],
		'ipod': ['ipod', 'i-pod', 'i pod'],
		'sea biscuit': ['seabiscuit'],
		'sea biscit': ['seabiscuit'],
		'foosball': ['foozball'],
		'foozball': ['foozball'],
		'universe': ['universe'],
		'cosmos': ['universe'],
		'foo': ['foo bar', 'baz']
	});
});

it('works with expand set to true', function() {
	var withExpand = synonyms.parse(input, true, true);

	expect(withExpand).to.deep.equal({
		'i-pod': ['ipod', 'i-pod', 'i pod'],
		'i pod': ['ipod', 'i-pod', 'i pod'],
		'ipod': ['ipod', 'i-pod', 'i pod'],
		'sea biscuit': ['seabiscuit'],
		'sea biscit': ['seabiscuit'],
		'foozball': ['foozball', 'foosball'],
		'foosball': ['foozball', 'foosball'],
		'universe': ['universe', 'cosmos'],
		'cosmos': ['universe', 'cosmos'],
		'foo': ['foo bar', 'baz']
	});
});