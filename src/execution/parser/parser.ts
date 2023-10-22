import ParserUtils from "./parserUtils";
import { SyntaxTree } from "../syntax/syntax";

/**A parser class, that only has one method. 
 * This takes in a string (most probably from the input text box) and then returns a `SyntaxTree` or an `Error` if there is an error.
 * 
 * The return value is taken by a executer/
 **/
export class Parser {
	static parse(input: string): SyntaxTree | Error {
		try {
			return ParserUtils.combineParse(input);
		} catch (error) {
			console.error(error);
			return error as Error;
		}
	}
}
