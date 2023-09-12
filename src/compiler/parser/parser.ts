import ParseError from "./errors";
import ParserUtils from "./parserUtils";

export class Parser {
	public static parse(input: string) {
		try {
			let stage1 = ParserUtils.tertiaryParser(input);
			let stage2 = ParserUtils.primaryParser(stage1);
		} catch (error) {
			if(error instanceof ParseError) {
				
			}
		}
	}
}
