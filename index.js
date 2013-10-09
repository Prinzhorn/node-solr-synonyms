var trim = function(str) {
	return str.trim();
};

var removeEmpty = function(str) {
	return !!str;
};

var parse = function(input, ignoreCase, expand) {
	//true by default.
	ignoreCase = ignoreCase !== false;

	if(ignoreCase) {
		input = input.toLowerCase();
	}

	//The map that will contain all synonym mappings.
	var output = Object.create(null);

	//Get all relevant lines (ignore comments and empty line-breaks).
	var rxLines = /^[^#\n\r]+/gm;
	var line;
	var words, lhsWords, rhsWords;

	while(line = rxLines.exec(input)) {
		line = trim(line[0]);

		if(line.indexOf('=>') > -1) {
			words = line.match(/^(.+)=>(.+)/);

			if(!words) {
				continue;
			}

			lhsWords = words[1].split(',').map(trim).filter(removeEmpty);
			rhsWords = words[2].split(',').map(trim).filter(removeEmpty);

			lhsWords.forEach(function(left) {
				if(!output[left]) {
					output[left] = {};
				}

				rhsWords.forEach(function(right) {
					output[left][right] = 1;
				});
			});
		} else {
			words = line.split(',').map(trim).filter(removeEmpty);

			words.forEach(function(outer) {
				if(!output[outer]) {
					output[outer] = {};
				}

				(expand ? words : [words[0]]).forEach(function(inner) {
					output[outer][inner] = 1;
				});
			});
		}
	}

	Object.keys(output).forEach(function(key) {
		output[key] = Object.keys(output[key]);
	});

	return output;
};

var replace = function(tokens, synonyms) {
	var output = [];

	tokens.forEach(function(token) {
		output.push.apply(output, synonyms[token] || [token]);
	});

	return output;
};

module.exports = {
	parse: parse,
	replace: replace
};