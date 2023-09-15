import ParserUtils from "./parserUtils";
import { SyntaxTree } from "../syntax/syntax";

export class Parser {
	parse(input: string): SyntaxTree | Error {
		try {
			let stage1 = ParserUtils.tertiaryParser(input);
			let stage2 = ParserUtils.secondaryParser(stage1);
			return stage2;
		} catch (error) {
			return error as Error;
		}
	}
}
