import { flushSync } from "react-dom";
import { Log, Benchmark } from "./test_utils";

/**
 * A more advanced splitter that splits the string based on the given `delimiter` and also splits the string if there is quotes (', ", `) in the string.
 * @param str input string
 * @param delimiter delimiter to split the string on
 * @returns the splitted string as an array
 */
export function stringSplitter(str: string, delimiter: string = " "): string[] {
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

/**
 * This takes in a string and splits it based on the brackets. It also checks for errors like mismatched brackets, quotes, etc.
 * This respects quotes. ie it treats quotes as a single unit and does not split contents inside it.
 * Splitting is only done for brackets and no other characters. The processed array then needs to be splitted using other potential functions
 * TODO Refactor this function to make it more readable;
 * @param input
 * @returns An array of the splitted according to the brackets
 */
export function bracketSplitter(input: string): any[] {
	const result: any[] = [];
	let currentChunk = "";
	const stack: any[] = [result];
	let inString = false;
	let stringChar = "";
	//Keeps count of quotes and brackets for error corrections
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
				//Counts the quotes
				char == "'" ? Counts.singleQuotes++ : Counts.doubleQuotes++;

				//Check for invalid quotes in the closing part. Eg: "Hello"World"
				if (
					i < input.length - 1 &&
					input[i + 1] !== " " &&
					input[i + 1] !== ")"
				)
					throw new Error("Invalid quote");

				currentChunk += char;
				inString = false;
			} else {
				currentChunk += char;
			}
		} else if (char === "'" || char === '"') {
			//Counts the quotes
			char == "'" ? Counts.singleQuotes++ : Counts.doubleQuotes++;

			//Checks for invalid quotes in the opening part. Eg: Hello"World"
			if (i > 0 && input[i - 1] !== " " && input[i - 1] !== "(")
				throw new Error("Invalid quote");

			inString = true;
			stringChar = char;
			currentChunk += char;
		} else if (char === "(") {
			//Checks for space/(bracket?) before opening bracket;
			if (i > 0 && input[i - 1] !== " " && input[i - 1] !== "(")
				throw new Error("Space not found");

			//Checks for "rouge" brackets. That is, if there are closing brackets without opening brackets;
			if (!Array.isArray(stack[stack.length - 1]))
				throw new Error("Empty brackets found");

			Counts.openBracket++;
			if (currentChunk.trim() !== "") {
				stack[stack.length - 1].push(currentChunk.trim());
				currentChunk = "";
			}

			const subarray: any[] = [];
			stack[stack.length - 1].push(subarray);
			stack.push(subarray);
		} else if (char === ")") {
			//Checks for space/(bracket?) after closing bracket;
			if (i < input.length - 1 && input[i + 1] !== " " && input[i + 1] !== ")")
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

	//Checks for quote mismatch, ie the same number of quotes should be present;
	if (Counts.singleQuotes % 2 !== 0 || Counts.doubleQuotes % 2 !== 0) {
		throw new Error("Quote mismatch");
	}

	return result;
}

function combinedSplit(input: any[]) {
	let result: any[] = [];

	for (let item of input) {
		if (typeof item === "string") {
			result.push(...stringSplitter(item));
		} else {
			result.push(combinedSplit(item));
		}
	}

	return result;
}

export function secondaryParser(input: string): any[] {
	return combinedSplit(bracketSplitter(input));
}
