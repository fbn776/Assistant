export class CommandNameError extends Error {
	constructor(str: string, name: string) {
		super(`Command name error\n\nReason: ${str}\n\nOccurred due to: ${name}\n`);
	}
}

/**Checks if two string array has duplicates;
 * Returns the duplicate string if duplicate is found; else false
 */
export function hasDuplicates(arr: string[]): boolean | string {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				return arr[i];
			}
		}
	}
	return false;
}