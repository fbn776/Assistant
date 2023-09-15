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


/**
 * Converts unix time to HH:MM format;
 * TODO Add more custom formats;
 */
export function convertUnixTime(unixTime: number): string {
	const currentDate = new Date(unixTime);

	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();

	const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return `${formattedHours}:${formattedMinutes}`;
}

export const debounce = (fn: Function, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

/**Checks if a string is numeric in nature */
export function isNumeric(str: string) {
	return !isNaN(+str);
}

/**Checks if a string is a boolean (true or false)*/
export function isBoolean(str: string) {
	return str === "true" || str === "false";
}
