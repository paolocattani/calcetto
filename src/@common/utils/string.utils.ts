export function startWithOneOf(str: string, words: Array<string>): boolean {
	if (!str || words.length === 0) {
		return false;
	}
	let found = false;
	let ii = 0;
	while (ii < words.length && !found) {
		const w = words[ii];
		for (let jj = 0; jj < w.length; jj++) {
			if (w.charAt(jj) !== str.charAt(jj)) {
				break;
			}
			if (jj === w.length - 1) {
				found = true;
			}
		}
		ii++;
	}
	return found;
}
