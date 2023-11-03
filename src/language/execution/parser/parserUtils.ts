import {ParseErrors} from "../errors/parseErrors.ts";
import {SyntaxTree} from "../syntax/syntax.ts";

/**A utility class;
 * Functions defined here are not at all optimized; they may be slow and need to be optimized.
 * But currently they work and its all that matter; (guess I'm too lazy :P)
 */
export default class ParserUtils {
    /**Splits a given input to an array of string; but this respects quotes
     * That is; whatever is inside the quotes is not split, and remains as a single unit.
     */
    private static _splitByQuotes(
        str: string,
        delimiter: string = " "
    ): string[] {
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
                    if (i > 0 && str[i - 1] != " ")
                        throw new ParseErrors.SpaceNotFound(i);

                    let nextIndex = str.indexOf(str[i], i + 1);

                    if (nextIndex === -1) throw new ParseErrors.NoClosingQuoteFound(i);

                    result.push(str[i] + str.substring(i + 1, nextIndex) + str[i]);
                    i = nextIndex + 1;

                    if (i < str.length && str[i] != " ")
                        throw new ParseErrors.SpaceNotFound(i);

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
    private static _splitByBracket(input: string): any[] {
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
                        throw new ParseErrors.InvalidQuotes(i);

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
                    throw new ParseErrors.InvalidQuotes(i);

                inString = true;
                stringChar = char;
                currentChunk += char;
            } else if (char === "(") {
                //Checks for space/(bracket?) before opening bracket;
                if (i > 0 && input[i - 1] !== " " && input[i - 1] !== "(")
                    throw new ParseErrors.SpaceNotFound(i);

                //Checks for "rouge" brackets. That is, if there are closing brackets without opening brackets;
                if (!Array.isArray(stack[stack.length - 1]))
                    throw new ParseErrors.EmptyBrackets(i);

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
                    throw new ParseErrors.SpaceNotFound(i);
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
            if (!Array.isArray(stack[stack.length - 1]))
                throw new ParseErrors.InvalidBracket(input.length - 1);

            stack[stack.length - 1].push(currentChunk.trim());
        }

        if (Counts.openBracket !== Counts.closeBracket) {
            throw new ParseErrors.BracketMismatch(input.length - 1);
        }

        //Checks for quote mismatch, ie the same number of quotes should be present;
        if (Counts.singleQuotes % 2 !== 0 || Counts.doubleQuotes % 2 !== 0) {
            throw new ParseErrors.QuotesMismatch(input.length - 1);
        }

        return result;
    }

    /**This combines both quote splitting and bracket splitting recursively. This in a sense neatly arranges the string to further processing */
    private static _combinedSplit(input: any[]) {
        let result: any[] = [];

        for (let item of input) {
            if (typeof item === "string") {
                //Split the string; this splitting shouldn't split spaces inside the quotes. So splitByQuotes is used.
                result.push(...this._splitByQuotes(item));
            } else {
                result.push(this._combinedSplit(item));
            }
        }
        return result;
    }

    /**Takes in a string and then returns the syntax tree of the corresponding string(assuming the string is a command string)
     * If the string contains invalid stuffs then errors are throw*/
    static combineParse(input: string) {
        const result = this._combinedSplit(this._splitByBracket(input));
        const tree = new SyntaxTree();
        SyntaxTree.makeTree(result, tree);
        return tree;
    }
}
