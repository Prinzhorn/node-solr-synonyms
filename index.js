var parse = function(input, ignoreCase, expand) {
	input = input || '';

	//true by default.
	ignoreCase = ignoreCase !== false;

	if(ignoreCase) {
		input = input.toLowerCase();
	}

	//The map that will contain all synonym mappings.
	var output = Object.create(null);

	//Get all relevant lines (ignore comments and empty line-breaks).
	var rxLines = /^[^#\n\r]+/gm;
	var rxTrim = /^\s+|\s+$/g;
	var rxSplitWords = /\s*,\s*/g;
	var line;
	var words, lhsWords, rhsWords;

	while(line = rxLines.exec(input)) {
		line = line[0].replace(rxTrim, '');

		if(line.indexOf('=>') > -1) {
			words = line.match(/^(.+)\s*=>\s*(.+)/);

			if(!words) {
				continue;
			}

			lhsWords = words[1].split(rxSplitWords);
			rhsWords = words[2].split(rxSplitWords);

			lhsWords.forEach(function(left) {
				output[left] = rhsWords.slice(0);
			});
		} else {
			words = line.split(rxSplitWords);

			if(!words.length) {
				continue;
			}

			words.forEach(function(word) {
				output[word] = expand ? words.slice(0) : [words[0]];
			});
		}
	}

	return output;
};

exports.parse = parse;