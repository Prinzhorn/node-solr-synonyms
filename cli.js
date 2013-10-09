#! /usr/bin/env node

//Reads a synonyms file and outputs the parsed object as pretty printed JSON.

var program = require('commander');
var fs = require('fs');
var diacritics = require('diacritics');
var synonyms = require('./');

program
	.version('0.0.1')
	.usage('[options] <file>')
	.option('-d, --preserve-diacritics', 'Preserve diacritical marks. By default é will turn to e and so on.')
	.option('-c, --case-sensitive', 'By default everything is lower-cased.')
	.option('-x, --expand', 'Expand the synonyms.')
	.option('-s, --single-line', 'By default the output is pretty printed and indented by 4 spaces.')
	.parse(process.argv);

var path = program.args[0];

if(!path) {
	program.help();
}

var contents = fs.readFileSync(path, 'UTF-8');

if(!program.preserveDiacritics) {
	contents = diacritics.remove(contents);
}

var parsed = synonyms.parse(contents, !!program.caseSensitive, !!program.expand);

console.log(JSON.stringify(parsed, null, program.singleLine ? 0 : 4));