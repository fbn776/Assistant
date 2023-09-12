import { BracketMismatchError, EmptyBracketsError, InvalidQuotesError, NoClosingQuoteFoundError, QuotesMismatchError, SpaceNotFoundError } from "./errors";
import { SyntaxTree } from "./syntax";



/**A utility class;
 * Functions defined here are not at all optimized; they may be slow and need to be optimized.
 * But currently they work and its all that matter; (guess I'm too lazy :P)
 */
export default class ParserUtils {
	/**Splits a given input to an array of string; but this respects quotes
	 * That is; whatever is inside the quotes is not split, and remains as a single unit.
	 */
	private static splitByQuotes(str: string, delimiter: string = " "): string[] {
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
					if (i > 0 && str[i - 1] != " ") throw new SpaceNotFoundError(i);

					let nextIndex = str.indexOf(str[i], i + 1);

					if (nextIndex === -1) throw new NoClosingQuoteFoundError(i);

					result.push(str[i] + str.substring(i + 1, nextIndex) + str[i]);
					i = nextIndex + 1;

					if (i < str.length && str[i] != " ")
						throw new SpaceNotFoundError(i);

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

	/**Splits a given input of string to an array/multi dimensional array of string; but this respects brackets
	 * What this actually does is that whenever a parenthesis is found, the content inside the parenthesis is split to a new array and then added to the original array as a new element.
	 * This also respects quotes.
	 */
	private static splitByBracket(input: string): any[] {
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
						throw new InvalidQuotesError(i);

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
					throw new InvalidQuotesError(i);

				inString = true;
				stringChar = char;
				currentChunk += char;
			} else if (char === "(") {
				//Checks for space/(bracket?) before opening bracket;
				if (i > 0 && input[i - 1] !== " " && input[i - 1] !== "(")
					throw new SpaceNotFoundError(i);

				//Checks for "rouge" brackets. That is, if there are closing brackets without opening brackets;
				if (!Array.isArray(stack[stack.length - 1]))
					throw new EmptyBracketsError(i);

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
				if (
					i < input.length - 1 &&
					input[i + 1] !== " " &&
					input[i + 1] !== ")"
				) {
					throw new SpaceNotFoundError(i);
				}
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

		if (Counts.openBracket !== Counts.closeBracket) {
			throw new BracketMismatchError(input.length - 1);
		}

		//Checks for quote mismatch, ie the same number of quotes should be present;
		if (Counts.singleQuotes % 2 !== 0 || Counts.doubleQuotes % 2 !== 0) {
			throw new QuotesMismatchError(input.length - 1);
		}

		return result;
	}

	/**This combines both quote splitting and bracket splitting recursively. This in a sense neatly arranges the string to further processing */
	private static combinedSplit(input: any[]) {
		let result: any[] = [];

		for (let item of input) {
			if (typeof item === "string") {
				//Split the string; this splitting shouldn't split spaces inside the quotes. So splitByQuotes is used.
				result.push(...this.splitByQuotes(item));
			} else {
				result.push(this.combinedSplit(item));
			}
		}

		return result;
	}

	/**This is the stage 1 parsing of the string;
	 * This combines quotes splitting, bracket splitting.
	 * For eg;
	 *
	 * For a given string "add 10 20 (add 30 40) 30"
	 *
	 * This returns ["add", "10", "20", ["add", "30", "40"], "30"]
	 */
	static tertiaryParser(input: string): any[] {
		return this.combinedSplit(this.splitByBracket(input));
	}

	static primaryParser(input: any[]) {
		let tree = new SyntaxTree();
		SyntaxTree.makeTree(input, tree);
		return tree;
	}
}
