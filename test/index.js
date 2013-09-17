var fs = require('fs');
var path = require('path');
var assert = require('assert');
var synonyms = require('../');

var input = fs.readFileSync(path.join(__dirname, '/synonyms.txt'), 'UTF-8');

var withoutExpand = synonyms.parse(input, true, false);

assert.deepEqual(withoutExpand, {
	"i-pod": [
		"ipod"
	],
	"i pod ": [
		"ipod"
	],
	"sea biscuit": [
		"seabiscuit"
	],
	"sea biscit ": [
		"seabiscuit"
	],
	"ipod": [
		"ipod"
	],
	"i pod": [
		"ipod"
	],
	"foozball": [
		"foozball"
	],
	"foosball": [
		"foozball"
	],
	"universe": [
		"universe"
	],
	"cosmos": [
		"universe"
	],
	"foo ": [
		"foo bar",
		"baz"
	]
}, 'WAT');

var withExpand = synonyms.parse(input, true, true);

assert.deepEqual(withExpand, {
	"i-pod": [
		"ipod"
	],
	"i pod ": [
		"ipod"
	],
	"sea biscuit": [
		"seabiscuit"
	],
	"sea biscit ": [
		"seabiscuit"
	],
	"ipod": [
		"ipod"
	],
	"i pod": [
		"ipod",
		"i-pod",
		"i pod"
	],
	"foozball": [
		"foozball",
		"foosball"
	],
	"foosball": [
		"foozball",
		"foosball"
	],
	"universe": [
		"universe",
		"cosmos"
	],
	"cosmos": [
		"universe",
		"cosmos"
	],
	"foo ": [
		"foo bar",
		"baz"
	]
}, 'WAT');

assert.equal(1,1);

console.log('OK');