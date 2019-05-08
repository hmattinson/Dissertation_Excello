// inspiration taken from:
// https://github.com/dy/parenthesis/blob/master/index.js

/**
 * Given a turtle instruction sequence this unwraps any brackets to create exact instrutions
 * @param str Turtle movement instructions e.g. "(r m3)4"
 * @return explicit unwrapped instructions e.g. "r m3 r m3 r m3 r m3"
 */
export function parseBrackets(str: string) {

	var unnestedStr = ['will become highest level'];
	var idPadding = '__';

	var deepestLevelBracketsRE = new RegExp('\\([^\\(\\)]*\\)'); // finds bracket with no brackets inside

	// store contents of bracket it unnestedStr and replace contents in str with ID
	while (deepestLevelBracketsRE.test(str)) {
		str = str.replace(deepestLevelBracketsRE,function(x) {
			unnestedStr.push(x.substring(1, x.length-1)); // add the token without the brackets
			return idPadding + (unnestedStr.length - 1) + idPadding;
		});
	}
	unnestedStr[0] = str; // make first element in array the highest level of the string

	var replacementIDRE = new RegExp('\\' + idPadding + '([0-9]+)' + idPadding);

	// transform references to tree
	function reNest (outestStr: string) {
		var renestingStr = [];
		var match;

		while (match = replacementIDRE.exec(outestStr)) {

			var matchIndex = match.index;
			var firstMatchID = match[1];
			var fullStringMatched = match[0];

			// push what was before
			if (matchIndex > 0) {
				renestingStr.push(outestStr.substring(0, matchIndex))
			}
			//perform recursively
			renestingStr.push(reNest(unnestedStr[firstMatchID]))
			// remove the string that has been processed
			outestStr = outestStr.substring(matchIndex + fullStringMatched.length)
		}
		renestingStr.push(outestStr)
		return renestingStr
	}

	return reNest(unnestedStr[0])
}
