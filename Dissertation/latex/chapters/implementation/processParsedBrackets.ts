export function processParsedBrackets(arr) {
	var s = "";
	var wasPrevArray = false;
	var prevArray = "";
	for (let val of arr) {
		if (val.constructor === Array) {
			prevArray = processParsedBrackets(val)
			wasPrevArray = true;
		}
		else {
			var singleInstructions = val.trim().split(" ");
			if (wasPrevArray) {
				s = s + prevArray;
				if (!isNaN(singleInstructions[0])) {
					for (var i=1; i<singleInstructions[0]; i++) {
						s = s + prevArray;
					}
					singleInstructions = singleInstructions.slice(1);
				}
			}
			for (let instruction of singleInstructions) {
				s = s + instruction + " ";
			}
			wasPrevArray = false;
		}
	}
	if (wasPrevArray) {
		s = s + prevArray;
	}
	return s;
}
