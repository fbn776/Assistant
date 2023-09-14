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
