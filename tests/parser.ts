/**
 * A printer/logger function
 */
function Log<T>(
	input: string,
	testFunc: (arg0: string) => Array<T>,
	title: string = ""
) {
	console.log(`\n\x1b[4;1m\x1b[34;1m${title}\x1b[0m`);
	console.time(title);
	console.log(testFunc(input));
	console.timeEnd(title);
}

/**
 * Basic splitting; splits the string based on the given delimiter. No additional process done.
 * Could be replaced by `string.split(delimiter)` but that would be cheating 😉
 * @param str string to be splitted (input)
 * @param delimiter delimiter to split the string on
 * @returns the splitted string as an array
 */
function basicSplitter(str: string, delimiter: string = " "): string[] {
	let result: string[] = [];
	let temp = "";
	for (let i = 0; i < str.length; i++) {
		if (str[i] == delimiter) {
			result.push(temp);
			temp = "";
		} else {
			temp += str[i];
		}
	}
	temp && result.push(temp);

	return result;
}

/**
 * A more advanced splitter that splits the string based on the given `delimiter` and also splits the string if there is quotes (', ", `) in the string.
 * @param str input string
 * @param delimiter delimiter to split the string on
 * @returns the splitted string as an array
 */
function stringSplitter(str: string, delimiter: string = " "): string[] {
	let result: string[] = [];
	let temp = "";
	for (let i = 0; i < str.length; i++) {
		if (
			str[i] === delimiter ||
			str[i] === "'" ||
			str[i] === '"' ||
			str[i] === "`"
		) {
			if (str[i] != delimiter) {
				if (i > 0 && str[i - 1] != " ") throw new Error("Space not found");

				let nextIndex = str.indexOf(str[i], i + 1);

				if (nextIndex === -1) throw new Error("No closing quote found");

				result.push(str.substring(i + 1, nextIndex));
				i = nextIndex + 1;

				if (i < str.length && str[i] != " ") throw new Error("Space not found");

				continue;
			}
			result.push(temp);
			temp = "";
		} else {
			temp += str[i];
		}
	}
	//Only push if there is something in temp; (short circuit evaluation)
	temp && result.push(temp);

	return result;
}

function splitStringToArray(input: string, autoclose = true): any[] {
	const result: any[] = [];
	let currentChunk = "";
	const stack: any[] = [result];
	let inString = false;
	let stringChar = "";
	let Counts = {
		openBracket: 0,
		closeBracket: 0,
		singleQuotes: 0,
		doubleQuotes: 0,
	};

	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (inString) {
			if (char === stringChar) {
				if (i < input.length - 1 && input[i + 1] !== " ")
					throw new Error("Invalid quote");
				currentChunk += char;
				inString = false;
			} else {
				currentChunk += char;
			}
		} else if (char === "'" || char === '"') {
			char == "'" ? Counts.singleQuotes++ : Counts.doubleQuotes++;

			if (i > 0 && input[i - 1] !== " ") throw new Error("Invalid quote");
			inString = true;
			stringChar = char;
			currentChunk += char;
		} else if (char === "(") {
			if (i > 0 && input[i - 1] !== " ") throw new Error("Space not found");
			if (!Array.isArray(stack[stack.length - 1]))
				throw new Error("Empty bracket");

			Counts.openBracket++;
			if (currentChunk.trim() !== "") {
				stack[stack.length - 1].push(currentChunk.trim());
				currentChunk = "";
			}
			const subarray: any[] = [];
			stack[stack.length - 1].push(subarray);
			stack.push(subarray);
		} else if (char === ")") {
			if (i < input.length - 1 && input[i + 1] !== " ")
				throw new Error("Space not found");
			Counts.closeBracket++;

			if (currentChunk.trim() !== "") {
				stack[stack.length - 1].push(currentChunk.trim());
				currentChunk = "";
			}
			stack.pop();
		} else {
			currentChunk += char;
		}
	}

	if (currentChunk.trim() !== "") {
		stack[stack.length - 1].push(currentChunk.trim());
	}

	if (Counts.openBracket !== Counts.closeBracket)
		throw new Error("Bracket mismatch");

	if(Counts.singleQuotes % 2 !== 0 || Counts.doubleQuotes % 2 !== 0) {
		throw new Error("Quote mismatch");
	}
	
	return result;
}

const input = `a ")`;
const result = splitStringToArray(input);
console.log(result);
