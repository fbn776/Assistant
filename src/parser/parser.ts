import ParserUtils from "./parser_utils";

export class Parser {
	public static parse(input: string) {
		let stage1 = ParserUtils.tertiaryParser(input);
		let stage2 = ParserUtils.primaryParser(stage1);

		console.log(stage2)		
	}
}
